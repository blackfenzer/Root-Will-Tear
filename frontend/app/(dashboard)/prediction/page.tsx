'use client';

import { useState } from 'react';
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

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    hn: '',
    sex: '',
    age: '',
    ud: '',
    bw: '',
    ht: '',
    bmi: '',
    ikdc: '',
    lysholm: '',
    klGrade: '',
    mmExtrusion: ''
  });
  const [model, setModel] = useState('');
  const [predictions, setPredictions] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    // Mock API call
    const mockData = [
      { time: '3 months', IKDC: 50, Lysholm: 45 },
      { time: '6 months', IKDC: 55, Lysholm: 50 },
      { time: '1 year', IKDC: 60, Lysholm: 55 },
      { time: '2 years', IKDC: 65, Lysholm: 60 },
      { time: '3 years', IKDC: 68, Lysholm: 62 },
      { time: '4 years', IKDC: 70, Lysholm: 65 }
    ];
    setPredictions(mockData);
    toast.success('Prediction successful');
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
                {['hn', 'sex', 'age', 'ud', 'bw', 'ht', 'bmi'].map((key) => (
                  <Input
                    key={key}
                    type="text"
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
                {['ikdc', 'lysholm', 'klGrade', 'mmExtrusion'].map((key) => (
                  <Input
                    key={key}
                    type="text"
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
            className="bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:text-[#493DB1] mt-4 w-full"
          >
            Confirm
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Prediction</h2>
          <Select onValueChange={setModel}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="model1">Model 1</SelectItem>
              <SelectItem value="model2">Model 2</SelectItem>
            </SelectContent>
          </Select>
          {predictions && (
            <ResponsiveContainer width="100%" height={300} className="mt-4">
              <LineChart data={predictions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="IKDC" stroke="blue" />
                <Line type="monotone" dataKey="Lysholm" stroke="purple" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
