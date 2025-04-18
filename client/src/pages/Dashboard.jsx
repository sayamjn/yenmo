import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
        <p className="text-gray-600 mb-4">
          Use this app to check your loan eligibility based on your mutual fund holdings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-blue-50">
          <h3 className="text-lg font-semibold mb-3">Check Loan Eligibility</h3>
          <p className="text-gray-600 mb-4">
            Enter your PAN number to check how much loan you qualify for based on
            your mutual fund portfolio.
          </p>
          <Link
            to="/eligibility-check"
            className="btn btn-primary inline-block"
          >
            Check Now
          </Link>
        </div>
        
        <div className="card bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Eligibility History</h3>
          <p className="text-gray-600 mb-4">
            View your past loan eligibility checks and track how your eligibility
            has changed over time.
          </p>
          <Link
            to="/eligibility-history"
            className="btn bg-gray-600 hover:bg-gray-700 inline-block"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;