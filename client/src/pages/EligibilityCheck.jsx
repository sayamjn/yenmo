import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinner from '../components/Spinner';

const EligibilityCheck = () => {
  const [pan, setPan] = useState('');
  const [loading, setLoading] = useState(false);
  const [holdings, setHoldings] = useState(null);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const validatePan = (panNumber) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panNumber);
  };

  const handlePanChange = (e) => {
    setPan(e.target.value.toUpperCase());
  };

  const fetchHoldings = async (e) => {
    e.preventDefault();
    
    if (!validatePan(pan)) {
      toast.error('Please enter a valid PAN number (e.g., ABCDE1234F)');
      return;
    }

    setLoading(true);
    setHoldings(null);
    setEligibilityResult(null);
    
    try {
      const res = await axios.get(`/api/mf/holdings?pan=${pan}`);
      setHoldings(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch holdings');
    } finally {
      setLoading(false);
    }
  };

  const calculateEligibility = async () => {
    if (!holdings) return;
    
    setLoading(true);
    
    try {
      const res = await axios.post('/api/eligibility/calculate', {
        pan: holdings.pan,
        holdings: holdings.holdings,
        total_value: holdings.total_value
      });
      
      setEligibilityResult(res.data.data);
      toast.success('Eligibility calculated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to calculate eligibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Check Loan Eligibility</h1>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Enter PAN Details</h2>
        <form onSubmit={fetchHoldings} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="pan">
              PAN Number
            </label>
            <input
              type="text"
              id="pan"
              value={pan}
              onChange={handlePanChange}
              className="form-input"
              placeholder="ABCDE1234F"
              maxLength="10"
              required
            />
            <p className="text-gray-500 text-sm mt-1">
              Format: 5 alphabets, 4 numbers, 1 alphabet (e.g., ABCDE1234F)
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch Mutual Fund Holdings'}
          </button>
        </form>
      </div>
      
      {loading && <Spinner />}
      
      {holdings && !loading && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Mutual Fund Holdings</h2>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-medium">PAN Number:</span> {holdings.pan}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Value:</span> ₹{holdings.total_value.toLocaleString('en-IN')}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Last Updated:</span> {new Date(holdings.last_updated).toLocaleString()}
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Fund Name</th>
                  <th className="py-2 px-4 border-b text-left">Category</th>
                  <th className="py-2 px-4 border-b text-right">Units</th>
                  <th className="py-2 px-4 border-b text-right">NAV (₹)</th>
                  <th className="py-2 px-4 border-b text-right">Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {holdings.holdings.map((fund, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{fund.fund_name}</td>
                    <td className="py-2 px-4 border-b">{fund.category}</td>
                    <td className="py-2 px-4 border-b text-right">{fund.units.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b text-right">{fund.nav.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b text-right">{fund.current_value.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <button
              onClick={calculateEligibility}
              className="btn btn-primary"
              disabled={loading}
            >
              Calculate Loan Eligibility
            </button>
          </div>
        </div>
      )}
      
      {eligibilityResult && !loading && (
        <div className="card bg-green-50">
          <h2 className="text-xl font-semibold mb-4">Loan Eligibility Result</h2>
          <div className="text-center py-4">
            <p className="text-gray-700 mb-2">Based on your mutual fund holdings, you are eligible for a loan of:</p>
            <p className="text-4xl font-bold text-green-600 mb-2">
              ₹{eligibilityResult.eligibleAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-gray-500 text-sm">
              Calculation Date: {new Date(eligibilityResult.checkDate).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded mt-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This eligibility is calculated based on 50% of your total mutual fund value. 
              Actual loan approval may depend on additional factors such as credit score, income, and existing loans.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityCheck;