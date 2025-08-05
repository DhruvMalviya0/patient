<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
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

<<<<<<< HEAD
export default api;
=======
export default api;
=======
const API_BASE_URL = 'http://localhost:5000/api'

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }
  
  return data
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// Auth API
export const authAPI = {
  register: async (patientData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(patientData)
    })
    return handleResponse(response)
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials)
    })
    return handleResponse(response)
  }
}

// Tests API
export const testsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    
    const response = await fetch(`${API_BASE_URL}/tests?${params}`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tests/${id}`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/tests/categories/list`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  }
}

// Bookings API
export const bookingsAPI = {
  create: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    })
    return handleResponse(response)
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    
    const response = await fetch(`${API_BASE_URL}/bookings?${params}`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  cancel: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  downloadReport: async (id) => {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/report`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to download report')
    }
    
    return response
  }
}

// Patients API
export const patientsAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/patients/profile`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/patients/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    })
    return handleResponse(response)
  }
}

// Auth helpers
export const authHelpers = {
  setToken: (token) => {
    localStorage.setItem('authToken', token)
  },

  getToken: () => {
    return localStorage.getItem('authToken')
  },

  removeToken: () => {
    localStorage.removeItem('authToken')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  }
}
>>>>>>> 55e2b7feb9d242154308376969111cc7d19395d2
>>>>>>> fd8d5830b8a39491e9681aa9fb1442092f545ce0
