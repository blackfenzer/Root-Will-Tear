'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
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
import apiClient from '@/lib/axios';
import { Model } from 'types/model';
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
  const [featureImportance, setFeatureImportance] = useState<
    { feature: string; importance: number }[]
  >([]);

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
      const response = await apiClient.post(
        `/nn/${selectedModel}`,
        {
          model_tag: selectedModel,
          input_data: formData
        },
        {
          withCredentials: true
        }
      );

      const d = response.data;
      console.log(d[0]?.feature_importance);

      if (d[0]?.feature_importance) {
        const fi = d[0].feature_importance;
        const featureImportanceData = Object.entries(fi).map(
          ([key, value]) => ({
            feature: key,
            importance: value as number
          })
        );
        setFeatureImportance(featureImportanceData);
      }

      if (Array.isArray(d) && d[1] === 200) {
        const predictionValue = d[0]?.prediction?.[0]?.[0];
        setResult(predictionValue);
      } else {
        throw new Error('Unexpected response structure');
      }
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
      {/* Responsive grid: single column on small screens, two columns on md+ */}
      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow dark:bg-[#101010]">
          <h2 className="text-xl font-bold">Input</h2>
          {/* Responsive grid: stack on mobile and show side-by-side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mt-4">
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
                ).map((key, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>{key}</span>
                    <Input
                      type="number"
                      name={key}
                      placeholder={key.toUpperCase()}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-4/5"
                    />
                  </div>
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
                    'MM extrusion pre',
                    'MM gap',
                    'Degenerative meniscus',
                    'medial femoral condyle',
                    'medial tibial condyle',
                    'lateral femoral condyle',
                    'lateral tibial condyle'
                  ] as (keyof typeof formData)[]
                ).map((key, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>{key}</span>
                    <Input
                      type="number"
                      name={key}
                      placeholder={key.toUpperCase()}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-2/3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button
            onClick={handlePredict}
            disabled={isLoading}
            className="mt-4 w-full bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:border-[#493DB1] hover:text-[#493DB1]
                      dark:bg-[#FFFBFB] dark:border-[#141414] dark:text-[#141414] dark:hover:bg-[#212121] dark:hover:text-[#FFFBFB]"
            variant="outline"
          >
            {isLoading ? 'Predicting...' : 'Confirm'}
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow dark:bg-[#101010]">
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
          <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-[#212121]">
            <div className="font-bold text-lg">Prediction Result</div>
            <div className="mt-2 p-2 text-base font-semibold bg-white dark:bg-[#101010] rounded-md shadow">
              {result || 'No prediction yet'}
            </div>
          </div>

          {featureImportance.length > 0 && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow dark:bg-[#101010]">
              <h2 className="text-xl font-bold mb-4">Feature Importance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="feature" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="importance" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
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
