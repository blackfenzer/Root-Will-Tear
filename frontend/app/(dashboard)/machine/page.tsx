'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import Footer from '@/components/footer/page';
import apiClient from '@/lib/axios';
import { User } from 'types/user';
import Cookies from 'js-cookie';
import axios from 'axios';

const Spinner = () => (
  <div className="animate-spin w-5 h-5 border-t-2 border-blue-500 rounded-full" />
);

// TypeScript interfaces for model data and update payload
interface AllModelResponse {
  id: number;
  name: string;
  model_architecture: string;
  final_loss?: number;
  model_path: string;
  bentoml_tag: string;
  is_active: boolean;
  created_at: string;
  csv_id?: number;
}

interface AllModelUpdate {
  model_architecture?: string;
  final_loss?: number;
  model_path?: string;
  bentoml_tag?: string;
  is_active?: boolean;
  csv_id?: number;
}

export default function ModelManagement() {
  // State for fetched models
  const [models, setModels] = useState<AllModelResponse[]>([]);
  const [filter, setFilter] = useState('');

  // State for model metadata (for create/edit)
  const [newModel, setNewModel] = useState<Partial<AllModelResponse>>({
    name: '',
    model_architecture: '',
    final_loss: 0,
    model_path: '',
    bentoml_tag: '',
    is_active: true
  });

  // Additional state for CSV training parameters (used only on create)
  const [trainingDescription, setTrainingDescription] = useState('');
  const [trainingVersion, setTrainingVersion] = useState('');

  // Determines if we are in create mode or editing an existing model.
  // When editing, we use the model's name as its identifier.
  const [editModelName, setEditModelName] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // File state for CSV uploads
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null); // State to store the user info

  // Fetch models from backend on mount
  useEffect(() => {
    const handleGetMe = async () => {
      const sessionToken = Cookies.get('session_token'); // Adjust the cookie name based on your app

      // Skip the API call if no session token exists
      if (!sessionToken) {
        console.log('No session token, skipping user fetch.');
        return;
      }

      try {
        // Make a GET request to fetch the user information (adjust API endpoint accordingly)
        const response = await axios.get('http://localhost:8000/api/v1/me', {
          withCredentials: true // Ensure cookies are included
        });

        // If the response contains user data, set the user state
        if (response?.data) {
          setUser({
            username: response.data.username, // Assuming the response has `username` and `role`
            role: response.data.role
          });
          console.log(response.data.role);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call handleGetMe when the component mounts
    handleGetMe();
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response =
          await apiClient.get<AllModelResponse[]>('/api/v1/model/');
        setModels(response.data);
      } catch (error) {
        toast.error('Failed to fetch models');
      }
    };
    fetchModels();
  }, []);

  // Filter models based on name, created_at, or BentoML tag
  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(filter.toLowerCase()) ||
      model.created_at.includes(filter) ||
      model.bentoml_tag.toLowerCase().includes(filter.toLowerCase())
  );

  // Create new model via training endpoint
  const handleCreate = async () => {
    if (!file) {
      toast.error('Please select a CSV file to upload');
      return;
    }
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Build query parameters from form state
      const queryParams = new URLSearchParams({
        name: newModel.name || '',
        version: trainingVersion,
        description: trainingDescription
      });
      const response = await apiClient.post<AllModelResponse>(
        `/smart/model_train?${queryParams.toString()}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      // Update models state with the returned model data
      setModels([...models, response.data]);
      // Reset form state
      setNewModel({
        name: '',
        model_architecture: '',
        final_loss: 0,
        model_path: '',
        bentoml_tag: '',
        is_active: true
      });
      setTrainingDescription('');
      setTrainingVersion('');
      setFile(null);
      setIsCreating(false);
      toast.success('Model trained and CSV uploaded successfully!');
    } catch (error) {
      toast.error('Failed to train model');
    } finally {
      setIsCreating(false);
    }
  };

  // Update model metadata via PUT endpoint
  const handleEdit = async (modelName: string) => {
    try {
      const response = await apiClient.put<AllModelResponse>(
        `/api/v1/model/models/${modelName}`,
        newModel as AllModelUpdate
      );
      setModels(
        models.map((model) =>
          model.name === modelName ? response.data : model
        )
      );
      setEditModelName(null);
      setNewModel({
        name: '',
        model_architecture: '',
        final_loss: 0,
        model_path: '',
        bentoml_tag: '',
        is_active: true
      });
      toast.success('Model updated successfully!');
    } catch (error) {
      toast.error('Failed to update model');
    }
  };

  // Delete model via DELETE endpoint
  const handleDelete = async (modelName: string) => {
    try {
      await apiClient.delete(`/api/v1/model/${modelName}`);
      setModels(models.filter((model) => model.name !== modelName));
      toast.success('Model deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete model');
    }
  };

  // Handle file input change to set file state
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  // Download CSV via the download endpoint
  const handleDownloadCSV = (csvId: number) => {
    const downloadUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/smart/download/csv/${csvId}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-8">
        <div className="flex gap-4 mb-8">
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.name}>
                  {`${model.name} (${model.created_at})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:text-[#493DB1]"
            onClick={() => {
              setEditModelName(null);
              setNewModel({
                name: '',
                model_architecture: '',
                final_loss: 0,
                model_path: '',
                bentoml_tag: '',
                is_active: true
              });
              setTrainingDescription('');
              setTrainingVersion('');
              setFile(null);
              setIsCreating(true);
            }}
          >
            Create New Model
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Left Column: List of Models */}
          <div className="w-1/2">
            <Input
              placeholder="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mb-4"
            />
            <div className="space-y-4">
              {filteredModels.map((model) => (
                <Card key={model.id}>
                  <CardContent className="flex justify-between items-center p-4">
                    <div className="flex-1">
                      <strong className="block">{model.name}</strong>
                      <div>{`Created: ${model.created_at}`}</div>
                      <div>{`Architecture: ${model.model_architecture}`}</div>
                      <div>{`BentoML Tag: ${model.bentoml_tag}`}</div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      {user?.role === 'admin' && (
                        <div className="flex gap-2">
                          <Button
                            className="bg-[#FFFBFB] border-[#493DB1] text-[#493DB1] hover:bg-[#493DB1] hover:text-[#FFFBFB]"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setIsCreating(false);
                              setEditModelName(model.name);
                              setNewModel({
                                name: model.name,
                                model_architecture: model.model_architecture,
                                final_loss: model.final_loss || 0,
                                model_path: model.model_path,
                                bentoml_tag: model.bentoml_tag,
                                is_active: model.is_active
                              });
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(model.name)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                      {model.csv_id && (
                        <Button
                          className="bg-[#FFFBFB] border-[#493DB1] text-[#493DB1] hover:bg-[#493DB1] hover:text-[#FFFBFB]"
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleDownloadCSV(model.csv_id as number)
                          }
                        >
                          Download CSV
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Create/Edit Form */}
          {isCreating && (
            <div className="w-5/12">
              <h2 className="text-xl font-bold mb-4">Create New Model</h2>
              <Label>Name</Label>
              <Input
                value={newModel.name}
                onChange={(e) =>
                  setNewModel({ ...newModel, name: e.target.value })
                }
                placeholder="Model Name"
                className="mb-4"
              />
              <Label>Upload CSV for Training</Label>
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="mb-4"
              />
              <Label>Training Description</Label>
              <Input
                value={trainingDescription}
                onChange={(e) => setTrainingDescription(e.target.value)}
                placeholder="Training Description"
                className="mb-4"
              />
              <Label>Training Version</Label>
              <Input
                value={trainingVersion}
                onChange={(e) => setTrainingVersion(e.target.value)}
                placeholder="Training Version"
                className="mb-4"
              />
              <Button
                className="bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:text-[#493DB1]"
                onClick={handleCreate}
              >
                Add Model
              </Button>
            </div>
          )}

          {editModelName !== null && (
            <div className="w-5/12">
              <h2 className="text-xl font-bold mb-4">Edit Model</h2>
              <Label>Model Architecture</Label>
              <Input
                value={newModel.model_architecture}
                onChange={(e) =>
                  setNewModel({
                    ...newModel,
                    model_architecture: e.target.value
                  })
                }
                placeholder="Model Architecture"
                className="mb-4"
              />
              <Label>Final Loss</Label>
              <Input
                type="number"
                value={newModel.final_loss?.toString() || '0'}
                onChange={(e) =>
                  setNewModel({
                    ...newModel,
                    final_loss: Number(e.target.value)
                  })
                }
                placeholder="Final Loss"
                className="mb-4"
              />
              <Label>Model Path</Label>
              <Input
                value={newModel.model_path}
                onChange={(e) =>
                  setNewModel({ ...newModel, model_path: e.target.value })
                }
                placeholder="Model Path"
                className="mb-4"
              />
              <Label>BentoML Tag</Label>
              <Input
                value={newModel.bentoml_tag}
                onChange={(e) =>
                  setNewModel({ ...newModel, bentoml_tag: e.target.value })
                }
                placeholder="BentoML Tag"
                className="mb-4"
              />
              <Label>Is Active</Label>
              <Input
                type="checkbox"
                checked={newModel.is_active || false}
                onChange={(e) =>
                  setNewModel({ ...newModel, is_active: e.target.checked })
                }
                className="mb-4"
              />
              <Button
                className="bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:text-[#493DB1]"
                onClick={() => handleEdit(editModelName)}
              >
                Update Model
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
