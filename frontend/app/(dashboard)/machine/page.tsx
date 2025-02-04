'use client';

import { useState } from 'react';
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

export default function ModelManagement() {
  const [models, setModels] = useState([
    {
      id: 1,
      name: 'Model A',
      createDate: '2023-01-15',
      trainingData: 'Dataset A',
      patientDetails: 'HN, Sex, Age\n12345678, Male, XX\n'
    },
    {
      id: 2,
      name: 'Model B',
      createDate: '2023-02-10',
      trainingData: 'Dataset B',
      patientDetails: 'HN, Sex, Age\n87654321, Female, YY\n'
    }
  ]);

  const [filter, setFilter] = useState('');
  const [newModel, setNewModel] = useState({
    name: '',
    createDate: '',
    trainingData: '',
    patientDetails: null // Initialize as null
  });
  const [editModelId, setEditModelId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(filter.toLowerCase()) ||
      model.createDate.includes(filter) ||
      model.trainingData.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreate = () => {
    setModels([
      ...models,
      {
        id: Date.now(),
        ...newModel,
        createDate: new Date().toISOString().split('T')[0]
      }
    ]);
    setNewModel({
      name: '',
      createDate: '',
      trainingData: '',
      patientDetails: null
    });
    setIsCreating(false);
  };

  const handleEdit = (id) => {
    const updatedModels = models.map((model) =>
      model.id === id ? { ...model, ...newModel } : model
    );
    setModels(updatedModels);
    setEditModelId(null);
    setNewModel({
      name: '',
      createDate: '',
      trainingData: '',
      patientDetails: null
    });
  };

  const handleDelete = (id) => {
    setModels(models.filter((model) => model.id !== id));
  };

  const handleFileUpload = (event, modelId) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result;
        const updatedModels = models.map((model) =>
          model.id === modelId ? { ...model, patientDetails: csvData } : model
        );
        setModels(updatedModels);
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadCSV = (csvData, fileName) => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-8">
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id.toString()}>
                {`${model.name} (${model.createDate})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className='bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:text-[#493DB1]'
          onClick={() => {
            setEditModelId(null);
            setNewModel({
              name: '',
              createDate: '',
              trainingData: '',
              patientDetails: null
            });
            setIsCreating(true);
          }}
        >
          Create New Model
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Left Column */}
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
                  {/* Details Section */}
                  <div className="flex-1">
                    <strong className="block">{model.name}</strong>
                    <div>{`Created: ${model.createDate}`}</div>
                    <div>{`Training Data: ${model.trainingData}`}</div>
                  </div>

                  {/* Button Section */}
                  <div className="flex flex-col items-center gap-2">
                    {/* First Row: Edit and Delete */}
                    <div className="flex gap-2">
                      <Button
                        className='bg-[#FFFBFB] border-[#493DB1] text-[#493DB1] hover:bg-[#493DB1] hover:text-[#FFFBFB]'
                        size="sm"
                        variant={'outline'}
                        onClick={() => {
                          setEditModelId(model.id);
                          setNewModel({
                            name: model.name,
                            createDate: model.createDate,
                            trainingData: model.trainingData,
                            patientDetails: model.patientDetails
                          });
                          setIsCreating(false);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(model.id)}
                      >
                        Delete
                      </Button>
                    </div>

                    {/* Second Row: Download CSV */}
                    {model.patientDetails && (
                      <div>
                        <Button
                          className='bg-[#FFFBFB] border-[#493DB1] text-[#493DB1] hover:bg-[#493DB1] hover:text-[#FFFBFB]'
                          // className='bg-border-[#493DB1]'
                          size="sm"
                          variant={'outline'}
                          onClick={() =>
                            handleDownloadCSV(
                              model.patientDetails,
                              `${model.name}_PatientDetails.csv`
                            )
                          }
                        >
                          Download CSV
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column */}
        {(isCreating || editModelId !== null) && (
          <div className="w-5/12">
            <h2 className="text-xl font-bold mb-4">
              {editModelId ? 'Edit Model' : 'Create New Model'}
            </h2>
            <Label>Name</Label>
            <Input
              value={newModel.name}
              onChange={(e) =>
                setNewModel({ ...newModel, name: e.target.value })
              }
              placeholder="Model Name"
              className="mb-4"
            />
            <Label>Training Data</Label>
            <Input
              value={newModel.trainingData}
              onChange={(e) =>
                setNewModel({ ...newModel, trainingData: e.target.value })
              }
              placeholder="Training Data"
              className="mb-4"
            />
            <Label>Upload Patient Details CSV</Label>
            <Input
              type="file"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, editModelId || Date.now())}
              className="mb-4"
            />
            <Button
              className='bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:text-[#493DB1]'
              onClick={() => {
                editModelId ? handleEdit(editModelId) : handleCreate();
              }}
            >
              {editModelId ? 'Update' : 'Add'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
