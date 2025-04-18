import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinner from '../components/Spinner';

const EligibilityHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/eligibility/history');
        setHistory(res.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Eligibility Check History</h1>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Eligibility Check History</h1>
      
      {history.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-600 mb-4">You haven't performed any eligibility checks yet.</p>
          <Link to="/eligibility-check" className="btn btn-primary">
            Check Eligibility Now
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">PAN</th>
                  <th className="py-2 px-4 border-b text-right">Total MF Value (₹)</th>
                  <th className="py-2 px-4 border-b text-right">Eligible Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {history.map((check) => (
                  <tr key={check._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      {new Date(check.checkDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4 border-b">{check.pan}</td>
                    <td className="py-3 px-4 border-b text-right">
                      {check.totalMfValue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 border-b text-right font-medium text-green-600">
                      {check.eligibleAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/eligibility-check" className="btn btn-primary">
              Check Eligibility Again
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityHistory;