// Frontend-only API implementation using localStorage and mock data

// Mock data for lab tests
const mockTests = [
  {
    _id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Blood Tests",
    price: 299,
    duration: "2-4 hours",
    description: "Comprehensive blood analysis including RBC, WBC, platelets, and hemoglobin levels.",
    preparation: "No fasting required",
    popular: true,
  },
  {
    _id: 2,
    name: "Lipid Profile",
    category: "Blood Tests",
    price: 450,
    duration: "4-6 hours",
    description: "Cholesterol and triglyceride levels to assess cardiovascular health.",
    preparation: "12-hour fasting required",
    popular: true,
  },
  {
    _id: 3,
    name: "Thyroid Function Test (TFT)",
    category: "Hormone Tests",
    price: 650,
    duration: "6-8 hours",
    description: "TSH, T3, and T4 levels to evaluate thyroid function.",
    preparation: "No special preparation needed",
    popular: false,
  },
  {
    _id: 4,
    name: "Diabetes Panel (HbA1c)",
    category: "Blood Tests",
    price: 380,
    duration: "4-6 hours",
    description: "Blood sugar levels and HbA1c for diabetes monitoring.",
    preparation: "No fasting required for HbA1c",
    popular: true,
  },
  {
    _id: 5,
    name: "Liver Function Test (LFT)",
    category: "Blood Tests",
    price: 520,
    duration: "4-6 hours",
    description: "Comprehensive liver enzyme and protein analysis.",
    preparation: "8-hour fasting recommended",
    popular: false,
  },
  {
    _id: 6,
    name: "Vitamin D Test",
    category: "Vitamin Tests",
    price: 750,
    duration: "24-48 hours",
    description: "Vitamin D3 levels to assess bone health and immunity.",
    preparation: "No special preparation needed",
    popular: true,
  },
  {
    _id: 7,
    name: "Kidney Function Test (KFT)",
    category: "Blood Tests",
    price: 480,
    duration: "4-6 hours",
    description: "Creatinine, urea, and electrolyte levels to assess kidney function.",
    preparation: "8-hour fasting recommended",
    popular: false,
  },
  {
    _id: 8,
    name: "Cardiac Markers",
    category: "Heart Tests",
    price: 1200,
    duration: "6-8 hours",
    description: "Troponin, CK-MB, and other markers for heart health assessment.",
    preparation: "No special preparation needed",
    popular: false,
  },
]

// Helper function to simulate API delay
const simulateApiCall = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data })
    }, delay)
  })
}

// Helper function to get auth headers (for compatibility)
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
    // Generate a mock token
    const token = 'mock_token_' + Date.now()
    const patient = {
      _id: Date.now(),
      patientId: 'PAT' + Date.now(),
      ...patientData,
      createdAt: new Date().toISOString()
    }
    
    // Store in localStorage
    localStorage.setItem('authToken', token)
    localStorage.setItem('currentPatient', JSON.stringify(patient))
    
    // Also store in patients list for login functionality
    const patients = JSON.parse(localStorage.getItem('patients') || '[]')
    patients.push(patient)
    localStorage.setItem('patients', JSON.stringify(patients))
    
    return simulateApiCall({ data: { token, patient } })
  },

  login: async (credentials) => {
    // Check if user exists in localStorage
    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]')
    const patient = storedPatients.find(p => p.email === credentials.email && p.password === credentials.password)
    
    if (!patient) {
      throw new Error('Invalid credentials')
    }
    
    const token = 'mock_token_' + Date.now()
    localStorage.setItem('authToken', token)
    localStorage.setItem('currentPatient', JSON.stringify(patient))
    
    return simulateApiCall({ data: { token, patient } })
  }
}

// Tests API
export const testsAPI = {
  getAll: async (filters = {}) => {
    let filteredTests = [...mockTests]
    
    if (filters.category && filters.category !== 'All') {
      filteredTests = filteredTests.filter(test => test.category === filters.category)
    }
    
    if (filters.search) {
      filteredTests = filteredTests.filter(test => 
        test.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        test.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }
    
    return simulateApiCall(filteredTests)
  },

  getById: async (id) => {
    const test = mockTests.find(t => t._id === parseInt(id))
    if (!test) {
      throw new Error('Test not found')
    }
    return simulateApiCall(test)
  },

  getCategories: async () => {
    const categories = [...new Set(mockTests.map(test => test.category))]
    return simulateApiCall(categories)
  }
}

// Bookings API
export const bookingsAPI = {
  create: async (bookingData) => {
    const currentPatient = JSON.parse(localStorage.getItem('currentPatient') || '{}')
    const test = mockTests.find(t => t._id === bookingData.testId)
    
    if (!test) {
      throw new Error('Test not found')
    }
    
    const booking = {
      _id: Date.now(),
      bookingId: 'BK' + Date.now(),
      patient: currentPatient,
      test: test,
      scheduledDate: bookingData.scheduledDate,
      scheduledTime: bookingData.scheduledTime,
      status: 'Scheduled',
      price: test.price,
      createdAt: new Date().toISOString(),
      reportAvailable: true, // Set to true for demo purposes
      notes: bookingData.notes || ''
    }
    
    // Store booking in localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    existingBookings.push(booking)
    localStorage.setItem('bookings', JSON.stringify(existingBookings))
    
    return simulateApiCall({ data: booking })
  },

  getAll: async (filters = {}) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    let filteredBookings = [...bookings]
    
    if (filters.status) {
      filteredBookings = filteredBookings.filter(booking => booking.status === filters.status)
    }
    
    return simulateApiCall(filteredBookings)
  },

  getById: async (id) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const booking = bookings.find(b => b._id === parseInt(id))
    
    if (!booking) {
      throw new Error('Booking not found')
    }
    
    return simulateApiCall(booking)
  },

  cancel: async (id) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const bookingIndex = bookings.findIndex(b => b._id === parseInt(id))
    
    if (bookingIndex === -1) {
      throw new Error('Booking not found')
    }
    
    bookings[bookingIndex].status = 'Cancelled'
    localStorage.setItem('bookings', JSON.stringify(bookings))
    
    return simulateApiCall({ data: bookings[bookingIndex] })
  },

  downloadReport: async (id) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const booking = bookings.find(b => b._id === parseInt(id))
    
    if (!booking) {
      throw new Error('Booking not found')
    }
    
    // Generate mock report content
    const reportContent = `
Patient Report
==============

Patient Name: ${booking.patient.name}
Patient ID: ${booking.patient.patientId}
Test: ${booking.test.name}
Category: ${booking.test.category}
Booking Date: ${new Date(booking.createdAt).toLocaleDateString()}
Test Date: ${booking.scheduledDate}
Report Date: ${new Date().toLocaleDateString()}

Test Results:
- All parameters within normal range
- No abnormalities detected
- Recommended follow-up: 6 months

This is a mock report for demonstration purposes.
    `.trim()
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    return Promise.resolve({
      blob: () => Promise.resolve(blob),
      ok: true
    })
  }
}

// Patients API
export const patientsAPI = {
  getProfile: async () => {
    const patient = JSON.parse(localStorage.getItem('currentPatient') || '{}')
    
    if (!patient._id) {
      throw new Error('Patient not found')
    }
    
    return simulateApiCall(patient)
  },

  updateProfile: async (profileData) => {
    const currentPatient = JSON.parse(localStorage.getItem('currentPatient') || '{}')
    const updatedPatient = { ...currentPatient, ...profileData }
    
    localStorage.setItem('currentPatient', JSON.stringify(updatedPatient))
    
    // Update in patients list
    const patients = JSON.parse(localStorage.getItem('patients') || '[]')
    const patientIndex = patients.findIndex(p => p._id === currentPatient._id)
    
    if (patientIndex !== -1) {
      patients[patientIndex] = updatedPatient
    } else {
      patients.push(updatedPatient)
    }
    
    localStorage.setItem('patients', JSON.stringify(patients))
    
    return simulateApiCall({ data: updatedPatient })
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
    localStorage.removeItem('currentPatient')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  }
}

// Legacy API exports for backward compatibility
export const auth = {
  login: async (credentials) => {
    const response = await authAPI.login(credentials)
    return response
  },
  register: async (userData) => {
    const response = await authAPI.register(userData)
    return response
  },
}

export const patients = {
  getProfile: async () => {
    const response = await patientsAPI.getProfile()
    return { data: { patient: response.data } }
  },
  updateProfile: async (profileData) => {
    const response = await patientsAPI.updateProfile(profileData)
    return response
  },
}

export const bookings = {
  create: async (bookingData) => {
    const response = await bookingsAPI.create(bookingData)
    return response
  },
  getAll: async () => {
    const response = await bookingsAPI.getAll()
    return { data: response.data }
  },
  getById: async (id) => {
    const response = await bookingsAPI.getById(id)
    return response
  },
  cancel: async (id) => {
    const response = await bookingsAPI.cancel(id)
    return response
  },
  getReport: async (id) => {
    const response = await bookingsAPI.downloadReport(id)
    return response
  },
}

export default {
  auth,
  patients,
  bookings,
  authAPI,
  testsAPI,
  bookingsAPI,
  patientsAPI,
  authHelpers
}
