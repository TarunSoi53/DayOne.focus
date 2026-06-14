import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  // Add API key from local storage if available
  if (typeof window !== 'undefined') {
    const apiKey = localStorage.getItem('dayone_ai_key');
    if (apiKey) {
      config.headers['x-ai-api-key'] = apiKey;
    }
  }
  return config;
});

export default api;
