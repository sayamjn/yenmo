import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Set axios defaults
  axios.defaults.baseURL = 'http://localhost:8080';

  // Set token in axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Check if token is expired
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
          } else {
            // Token valid, load user
            const res = await axios.get('/api/auth/me');
            setUser(res.data.data);
            setIsAuthenticated(true);
          }
        } catch (err) {
            console.log(err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token, navigate]);

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        return true;
      }
    } catch (err) {
      throw err.response?.data?.message || 'Registration failed';
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        return true;
      }
    } catch (err) {
      throw err.response?.data?.message || 'Login failed';
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;