import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Ensure this environment variable is set
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

export default apiClient;
