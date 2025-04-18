import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Loan Eligibility Checker
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Check your loan eligibility based on your mutual fund holdings
      </p>
      
      {isAuthenticated ? (
        <div className="space-x-4">
          <Link
            to="/eligibility-check"
            className="btn btn-primary"
          >
            Check Eligibility
          </Link>
          <Link
            to="/eligibility-history"
            className="btn bg-gray-600 hover:bg-gray-700"
          >
            View History
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            to="/register"
            className="btn btn-primary"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="btn bg-gray-600 hover:bg-gray-700"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;