import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EligibilityCheck from './pages/EligibilityCheck';
import EligibilityHistory from './pages/EligibilityHistory';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/eligibility-check" element={
            <PrivateRoute>
              <EligibilityCheck />
            </PrivateRoute>
          } />
          <Route path="/eligibility-history" element={
            <PrivateRoute>
              <EligibilityHistory />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Loan Eligibility Checker. All rights reserved.</p>
        </div>
      </footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;