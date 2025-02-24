'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Footer from '@/components/footer/page';
import { toast } from 'react-hot-toast';
import { ChangeEvent } from 'react';
import apiClient from '@/lib/axios';
import { Model } from 'types/model';
// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
// });
import Cookies from 'js-cookie';

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    sex: '',
    age: '',
    side: '',
    BW: '',
    Ht: '',
    BMI: '',
    'IKDC pre': '',
    'Lysholm pre': '',
    'Pre KL grade': '',
    'MM extrusion pre': ''
  });

  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await apiClient.get('/api/v1/model/');
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
        toast.error('Failed to load models');
      }
    };
    fetchModels();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value) // Convert input values to numbers
    }));
  };

  const handlePredict = async () => {
    if (!selectedModel) {
      toast.error('Please select a model');
      return;
    }

    setIsLoading(true);
    try {
      const sessionToken = Cookies.get('session_token');
      const response = await apiClient.post(`/nn/${selectedModel}`, {
        model_tag: selectedModel,
        input_data: formData,
        withCredentials: true
      });

      // Transform response data for chart
      // const chartData = Object.entries(response.data.predictions).map(
      //   ([time, values]) => ({
      //     time,
      //     ...values
      //   })
      // );
      console.log('example ', response);
      setResult(response.data.prediction);

      // setPredictions(chartData);
      toast.success('Prediction successful');
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Prediction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-8 grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Input</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="font-semibold mb-2">Patient Information</h3>
              <div className="space-y-3">
                {(
                  [
                    'sex',
                    'age',
                    'side',
                    'BW',
                    'Ht',
                    'BMI'
                  ] as (keyof typeof formData)[]
                ).map((key) => (
                  <Input
                    key={key}
                    type="number"
                    name={key}
                    placeholder={key.toUpperCase()}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pre Score</h3>
              <div className="space-y-3">
                {(
                  [
                    'IKDC pre',
                    'Lysholm pre',
                    'Pre KL grade',
                    'MM extrusion pre'
                  ] as (keyof typeof formData)[]
                ).map((key) => (
                  <Input
                    key={key}
                    type="number"
                    name={key}
                    placeholder={key.toUpperCase()}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </div>
          <Button
            onClick={handlePredict}
            disabled={isLoading}
            className="bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:text-[#493DB1] mt-4 w-full"
          >
            {isLoading ? 'Predicting...' : 'Confirm'}
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Prediction</h2>
          <Select onValueChange={setSelectedModel} value={selectedModel}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.name}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <h1>this is prediction result {result}</h1>
          {/* {predictions && (
            <ResponsiveContainer width="100%" height={300} className="mt-4">
              <LineChart data={predictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="IKDC"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Lysholm"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )} */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
