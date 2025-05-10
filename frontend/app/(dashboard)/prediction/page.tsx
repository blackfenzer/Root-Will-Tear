'use client';

import { useState, useEffect, useCallback, ChangeEvent, memo } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell
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
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { useUser } from 'context/UserContext';
import { ArrowRightLeft } from 'lucide-react';

const initialFormData = {
  sex: '',
  age: '',
  side: '',
  BW: '',
  Ht: '',
  'IKDC pre': '',
  'Lysholm pre': '',
  'Pre KL grade': '',
  'MM extrusion pre': '',
  'MM gap': '',
  'Degenerative meniscus': '',
  'medial femoral condyle': '',
  'medial tibial condyle': '',
  'lateral femoral condyle': ''
};

const DefaultFormData = {
  sex: '1',
  age: '57',
  side: '2',
  BW: '70',
  Ht: '159',
  'IKDC pre': '34',
  'Lysholm pre': '51',
  'Pre KL grade': '2',
  'MM extrusion pre': '4',
  'MM gap': '5',
  'Degenerative meniscus': '1',
  'medial femoral condyle': '3',
  'medial tibial condyle': '2',
  'lateral femoral condyle': '0.57'
};

const tooltipDescriptions = {
  sex: 'Patient sex: Enter 0 for male, 1 for female',
  age: 'Patient age in years',
  side: 'Affected side: Enter 0 for left, 1 for right',
  BW: 'Body weight in kilograms',
  Ht: 'Height in centimeters',
  'IKDC pre':
    'Pre-operative International Knee Documentation Committee score (0-100)',
  'Lysholm pre': 'Pre-operative Lysholm knee score (0-100)',
  'Pre KL grade': 'Pre-operative Kellgren-Lawrence grade (0-4)',
  'MM extrusion pre': 'Medial meniscus extrusion in millimeters',
  'MM gap': 'Medial meniscus gap in millimeters',
  'Degenerative meniscus': 'Enter 0 for no, 1 for yes',
  'medial femoral condyle': 'Medial femoral condyle status score (0-4)',
  'medial tibial condyle': 'Medial tibial condyle status score (0-4)',
  'lateral femoral condyle': 'Lateral femoral condyle status score (0-4)'
};

const InputWithTooltip = memo(
  ({
    name,
    value,
    onChange
  }: {
    name: keyof typeof initialFormData;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <motion.div whileHover={{ scale: 1.02 }}>
      <RadixTooltip.Provider delayDuration={300}>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger asChild>
            <div className="flex items-center justify-between">
              <span>{name}</span>
              <Input
                type="number"
                name={name}
                placeholder={name.toUpperCase()}
                value={value}
                onChange={onChange}
                className="max-w-[65%] flex-grow-1"
              />
            </div>
          </RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content
              className="rounded-md bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm text-black dark:text-white shadow-md z-50"
              sideOffset={5}
            >
              {tooltipDescriptions[name]}
              <RadixTooltip.Arrow className="fill-gray-200 dark:fill-gray-700" />
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    </motion.div>
  )
);
InputWithTooltip.displayName = 'InputWithTooltip';

export default function PredictionPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isMultipleData, setIsMultipleData] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvFileName, setCsvFileName] = useState<string>('');
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [multipleResults, setMultipleResults] = useState<any[]>([]);
  const [featureImportance, setFeatureImportance] = useState<
    { feature: string; importance: number }[]
  >([]);
  // Add state for tracking selected patient index in multiple results
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<
    number | null
  >(null);
  const { user, isLoading: userLoading } = useUser();

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      toast.error('Please login first');
      return;
    }

    const fetchModels = async () => {
      try {
        const response = await apiClient.get('/api/v1/model/', {
          withCredentials: true
        });
        setModels(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
        toast.error('Failed to load models');
      }
    };

    fetchModels();
  }, [user, userLoading]);

  // Memoized change handler
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []); // Empty dependency array ensures stable reference

  const handleToggleMode = () => {
    setIsMultipleData(!isMultipleData);
    // Reset results when switching modes
    setResult('');
    setMultipleResults([]);
    setFeatureImportance([]);
    setSelectedPatientIndex(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setCsvFile(file);
      setCsvFileName(file.name);
    }
  };

  const handleDownloadDefaultCSV = () => {
    const csv = document.createElement('a');
    csv.href = '/patients.csv'; // since it's in the public folder
    csv.download = 'patients.csv'; // this sets the download name
    csv.click();
  };

  // Function to select a patient and update the feature importance chart
  const handlePatientSelect = (index: number) => {
    setSelectedPatientIndex(index);

    // If we have feature importance data for this patient, update the chart
    if (multipleResults[index] && multipleResults[index].feature_importance) {
      const fi = multipleResults[index].feature_importance;
      const featureImportanceData = Object.entries(fi).map(([key, value]) => ({
        feature: key,
        importance: value as number
      }));
      setFeatureImportance(featureImportanceData);
    }
  };

  const handlePredict = async () => {
    if (!selectedModel) {
      toast.error('Please select a model');
      return;
    }

    setIsLoading(true);
    try {
      if (!isMultipleData) {
        // Single prediction
        const numericData = Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [
            key,
            formData[key as keyof typeof formData] === ''
              ? Number(DefaultFormData[key as keyof typeof DefaultFormData])
              : Number(formData[key as keyof typeof formData])
          ])
        );

        const response = await apiClient.post(
          `/api/v1/nn/${selectedModel}`,
          {
            model_tag: selectedModel,
            input_data: numericData
          },
          {
            withCredentials: true
          }
        );

        const d = response.data;

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
          const predictionValue = d[0]?.prediction;
          setResult(predictionValue);
        } else {
          throw new Error('Unexpected response structure');
        }

        toast.success('Prediction successful');
      } else {
        // Multiple prediction with CSV file
        if (!csvFile) {
          toast.error('Please upload a CSV file');
          setIsLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', csvFile);
        formData.append('model_tag', selectedModel);

        const response = await apiClient.post(
          `/api/v1/nn/${selectedModel}/batch`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        const data = response.data;
        if (Array.isArray(data) && data[0][1] === 200) {
          const scores = data
            .map((item) => item[0])
            .filter((obj) => obj?.prediction && obj?.feature_importance);
          console.log(scores);
          setMultipleResults(scores || []);

          // Reset selected patient
          setSelectedPatientIndex(null);

          // Show the first patient's feature importance by default
          if (scores.length > 0 && scores[0]?.feature_importance) {
            const fi = scores[0].feature_importance;
            const featureImportanceData = Object.entries(fi).map(
              ([key, value]) => ({
                feature: key,
                importance: value as number
              })
            );
            setFeatureImportance(featureImportanceData);
            setSelectedPatientIndex(0); // Select first patient by default
          }
        } else {
          throw new Error('Unexpected response structure');
        }

        toast.success('Multiple predictions successful');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Prediction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Responsive grid: single column on small screens, two columns on md+ */}
      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white p-6 rounded-lg shadow dark:bg-[#101010]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center justify-between mt-4">
            <motion.h2
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Input
            </motion.h2>

            <Button
              onClick={handleToggleMode}
              className="flex items-center gap-2 bg-[#493DB1] text-[#FFFBFB] hover:bg-[#3d32a0]"
            >
              <ArrowRightLeft size={16} />
              {isMultipleData ? 'Input Single Data' : 'Input Multiple Data'}
            </Button>
          </div>

          {isMultipleData ? (
            // Multiple data input (CSV upload)
            <motion.div
              className="mt-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                <label
                  htmlFor="csv-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {csvFileName
                      ? csvFileName
                      : 'Click to upload your CSV file'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    CSV with one data record per line
                  </span>
                  <input
                    id="csv-upload"
                    name="csv-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div>
                <Button
                  onClick={handleDownloadDefaultCSV}
                  title="Download a CSV template used for adding patient data. Each line represents one patient, and values are separated by commas (,). Make sure to follow the provided header format."
                  className="flex items-center gap-2 bg-[#FFFBFB] text-[#493DB1] hover:bg-[#FFFBFB]"
                >
                  Download headers CSV file
                </Button>
              </div>
            </motion.div>
          ) : (
            // Single data input (original form)
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mt-4">
              <div>
                <motion.h3
                  className="font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Patient Information
                </motion.h3>
                <div className="space-y-3">
                  {(
                    [
                      'sex',
                      'age',
                      'side',
                      'BW',
                      'Ht'
                    ] as (keyof typeof formData)[]
                  ).map((key) => (
                    <InputWithTooltip
                      key={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>
              <div>
                <motion.h3
                  className="font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Pre Score
                </motion.h3>
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
                      'lateral femoral condyle'
                    ] as (keyof typeof formData)[]
                  ).map((key) => (
                    <InputWithTooltip
                      key={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={handlePredict}
              disabled={isLoading}
              className="mt-4 w-full bg-[#493DB1] text-[#FFFBFB] hover:bg-[#FFFBFB] hover:border-[#493DB1] hover:text-[#493DB1]
                        dark:bg-[#FFFBFB] dark:border-[#141414] dark:text-[#141414] dark:hover:bg-[#212121] dark:hover:text-[#FFFBFB]"
              variant="outline"
            >
              {isLoading ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Predicting...
                </motion.span>
              ) : (
                'Confirm'
              )}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow dark:bg-[#101010]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)' }}
        >
          <motion.h2
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Prediction
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
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
          </motion.div>

          {/* Results Section - Single or Multiple based on mode */}
          {isMultipleData ? (
            // Multiple Results Display
            <motion.div
              className="mt-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="font-bold text-lg">
                Multiple Prediction Results (IKDC 2 Year)
              </div>

              {multipleResults.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  <table className="min-w-full bg-white dark:bg-[#101010] border border-gray-300 dark:border-gray-700">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="py-2 px-4 border-b text-left">#</th>
                        <th className="py-2 px-4 border-b text-left">
                          Prediction
                        </th>
                        <th className="py-2 px-4 border-b text-left">
                          IKDC Pre
                        </th>
                        <th className="py-2 px-4 border-b text-left">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {multipleResults.map((result, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${
                            selectedPatientIndex === index
                              ? 'bg-blue-50 dark:bg-blue-900'
                              : ''
                          }`}
                          onClick={() => handlePatientSelect(index)}
                        >
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">
                            {result.prediction
                              ? Math.round(Number(result.prediction) * 1000) /
                                1000
                              : 'N/A'}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {result.input_data && result.input_data['IKDC_pre']
                              ? Math.round(
                                  Number(result.input_data['IKDC_pre']) * 1000
                                ) / 1000
                              : 'N/A'}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {result.prediction &&
                            result.input_data &&
                            result.input_data['IKDC_pre'] ? (
                              <span
                                style={{
                                  color:
                                    Number(result.prediction) -
                                      Number(result.input_data['IKDC_pre']) >
                                    0
                                      ? '#4318FF'
                                      : Number(result.prediction) -
                                            Number(
                                              result.input_data['IKDC_pre']
                                            ) <
                                          0
                                        ? '#EE0707'
                                        : 'inherit'
                                }}
                              >
                                {Number(result.prediction) -
                                  Number(result.input_data['IKDC_pre']) >
                                  0 && '+'}
                                {Math.round(
                                  (Number(result.prediction) -
                                    Number(result.input_data['IKDC_pre'])) *
                                    1000
                                ) / 1000}
                              </span>
                            ) : (
                              'N/A'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 text-center border rounded-md bg-gray-50 dark:bg-gray-800">
                  No predictions yet. Upload a CSV file and click Confirm.
                </div>
              )}

              {/* Indicate which patient's data is being shown */}
              {multipleResults.length > 0 && selectedPatientIndex !== null && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Showing feature importance for Patient #
                  {selectedPatientIndex + 1}. Click on any row to view that
                  patient's data.
                </div>
              )}
            </motion.div>
          ) : (
            // Single Result Display (Original)
            <motion.div
              className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-[#212121]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="font-bold text-lg">
                Prediction Result (IKDC 2 Year)
              </div>
              {/* Using key to trigger re-render animation when result changes */}
              <motion.div
                key={result || 'no-result'}
                className="mt-2 p-2 text-base font-semibold bg-white dark:bg-[#101010] rounded-md shadow flex justify-between"
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
              >
                <div>
                  {result
                    ? Math.round(Number(result) * 1000) / 1000
                    : 'No prediction yet'}{' '}
                </div>
                {result &&
                  Number(result) - Number(formData['IKDC pre']) > 0 && (
                    <div className="ml-2" style={{ color: '#4318FF' }}>
                      +
                      {Math.round(
                        (Number(result) - Number(formData['IKDC pre'])) * 1000
                      ) / 1000}
                    </div>
                  )}

                {/* {result &&
                Math.round(
                  (Number(result) - Number(formData['IKDC pre']) * 1000) / 1000
                ) === 0 && <div className="ml-2">0</div>} */}

                {result &&
                  Number(result) - Number(formData['IKDC pre']) < 0 && (
                    <div className="ml-2" style={{ color: '#EE0707' }}>
                      {Math.round(
                        (Number(result) - Number(formData['IKDC pre'])) * 1000
                      ) / 1000}
                    </div>
                  )}
              </motion.div>
            </motion.div>
          )}

          {/* Feature Importance Chart - Common for both modes */}
          {featureImportance.length > 0 && (
            <motion.div
              className="mt-8 bg-white p-6 rounded-lg shadow dark:bg-[#101010]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Feature Importance
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                key={`feature-chart-${selectedPatientIndex !== null ? selectedPatientIndex : 'single'}`}
              >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={featureImportance}
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: -50, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 13 }}
                      label={{
                        value: 'Importance',
                        position: 'insideBottom',
                        offset: -18
                      }}
                    />
                    <YAxis
                      dataKey="feature"
                      type="category"
                      tick={{ fontSize: 13 }}
                      width={200}
                      interval={0}
                    />
                    <RechartTooltip
                      formatter={(value: number) => value.toFixed(4)}
                      cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend />
                    <Bar
                      dataKey="importance"
                      fill="#8884d8"
                      barSize={20}
                      animationDuration={1500}
                    >
                      {featureImportance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.importance > 0 ? '#4318FF' : '#EE0707'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
}
