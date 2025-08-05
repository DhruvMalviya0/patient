import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const auth = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Patient API
export const patients = {
  getProfile: async () => {
    const response = await api.get('/patients/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/patients/profile', profileData);
    return response.data;
  },
};

// Bookings API
export const bookings = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  cancel: async (id) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
  getReport: async (id) => {
    const response = await api.get(`/bookings/${id}/report`);
    return response.data;
  },
};

export default api;