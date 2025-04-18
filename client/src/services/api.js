import axios from 'axios';


// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const res = await axios.post('/api/auth/register', userData);
    return res.data;
  },
  
  login: async (userData) => {
    const res = await axios.post('/api/auth/login', userData);
    return res.data;
  },
  
  getProfile: async () => {
    const res = await axios.get('/api/auth/me');
    return res.data;
  }
};

// Mutual Fund API calls
export const mfAPI = {
  getHoldings: async (pan) => {
    const res = await axios.get(`/api/mf/holdings?pan=${pan}`);
    return res.data;
  }
};

// Eligibility API calls
export const eligibilityAPI = {
  calculateEligibility: async (data) => {
    const res = await axios.post('/api/eligibility/calculate', data);
    return res.data;
  },
  
  getHistory: async () => {
    const res = await axios.get('/api/eligibility/history');
    return res.data;
  }
};

// Set token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};