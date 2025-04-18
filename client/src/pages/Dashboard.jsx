import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Dashboard</h1>

      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome, {user?.name} 👋</h2>
        <p className="text-gray-600 text-base">
          Use this app to check your loan eligibility based on your mutual fund holdings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Check Loan Eligibility</h3>
          <p className="text-gray-600 mb-4">
            Enter your PAN number to find out how much loan you're eligible for based on your mutual fund portfolio.
          </p>
          <Link
            to="/eligibility-check"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Check Now
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Eligibility History</h3>
          <p className="text-gray-600 mb-4">
            View your past eligibility checks and track changes in your loan qualification over time.
          </p>
          <Link
            to="/eligibility-history"
            className="inline-block bg-gray-800 text-white px-5 py-2 rounded-xl font-medium hover:bg-gray-900 transition"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
