import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
      toast.success('Holdings fetched successfully!');
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
    <div className="max-w-5xl mx-auto fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Check Loan Eligibility</h1>
      
      <div className="card bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Enter PAN Details</h2>
        <form onSubmit={fetchHoldings} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="pan">
              PAN Number
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  id="pan"
                  value={pan}
                  onChange={handlePanChange}
                  className="form-input border cursor-pointer p-3"
                  placeholder="ABCDE1234F"
                  maxLength="10"
                  required
                />
                <p className="text-gray-500 text-sm mt-1">
                  Format: 5 alphabets, 4 numbers, 1 alphabet
                </p>
              </div>
              <div className="md:w-auto">
                <button
                  type="submit"
                  className="w-full md:w-auto btn btn-primary py-2 px-6"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Fetching...
                    </span>
                  ) : (
                    <h1 className='border p-3 cursor-pointer'>'Fetch Holdings'</h1>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {loading && <Spinner />}
      
      {holdings && !loading && (
        <div className="card bg-white rounded-lg shadow-md p-6 mb-6 fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Mutual Fund Holdings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">PAN Number</p>
              <p className="font-medium text-gray-800">{holdings.pan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Portfolio Value</p>
              <p className="font-medium text-gray-800">₹{holdings.total_value.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium text-gray-800">{new Date(holdings.last_updated).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="table-container mb-6">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b text-left">Fund Name</th>
                  <th className="py-3 px-4 border-b text-left hidden md:table-cell">Category</th>
                  <th className="py-3 px-4 border-b text-right hidden md:table-cell">Units</th>
                  <th className="py-3 px-4 border-b text-right hidden md:table-cell">NAV (₹)</th>
                  <th className="py-3 px-4 border-b text-right">Value (₹)</th>
                </tr>
              </thead>
              <tbody>
                {holdings.holdings.map((fund, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      <div>
                        <div className="font-medium">{fund.fund_name}</div>
                        <div className="text-sm text-gray-500 md:hidden">{fund.category}</div>
                        <div className="text-sm text-gray-500 md:hidden">
                          {fund.units.toFixed(2)} units × ₹{fund.nav.toFixed(2)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 border-b hidden md:table-cell">{fund.category}</td>
                    <td className="py-3 px-4 border-b text-right hidden md:table-cell">{fund.units.toFixed(2)}</td>
                    <td className="py-3 px-4 border-b text-right hidden md:table-cell">{fund.nav.toFixed(2)}</td>
                    <td className="py-3 px-4 border-b text-right font-medium">
                      ₹{fund.current_value.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan="4" className="py-3 px-4 border-b text-right font-semibold hidden md:table-cell">
                    Total Value:
                  </td>
                  <td className="py-3 px-4 border-b md:hidden">
                    <span className="font-semibold">Total Value:</span>
                  </td>
                  <td className="py-3 px-4 border-b text-right font-semibold text-blue-600">
                    ₹{holdings.total_value.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={calculateEligibility}
              className="btn btn-primary py-3 px-8 rounded-lg text-lg flex items-center"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
              </svg>
              Calculate Loan Eligibility
            </button>
          </div>
        </div>
      )}
      
      {eligibilityResult && !loading && (
        <div className="card bg-green-50 rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-500 fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Loan Eligibility Result
          </h2>
          
          <div className="text-center py-6">
            <p className="text-gray-700 mb-3">Based on your mutual fund holdings, you are eligible for a loan of:</p>
            <div className="bg-white rounded-lg p-6 shadow-sm inline-block">
              <p className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                ₹{eligibilityResult.eligibleAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Calculation Date: {new Date(eligibilityResult.checkDate).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg mt-4">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> This eligibility is calculated based on 50% of your total mutual fund value. 
                Actual loan approval may depend on additional factors such as credit score, income, and existing loans.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setEligibilityResult(null);
                setPan('');
                setHoldings(null);
              }}
              className="btn btn-secondary"
            >
              Check Another PAN
            </button>
            <Link
              to="/eligibility-history"
              className="btn btn-primary flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              View Eligibility History
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityCheck;