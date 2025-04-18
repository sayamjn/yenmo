import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="py-12 md:py-20 text-center fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Loan Eligibility Checker
        </h1>
        <p className="text-xl text-gray-600 mb-10 px-4">
          Quickly check your loan eligibility based on your mutual fund holdings
        </p>
        
        <div className="bg-blue-50 rounded-xl p-6 md:p-10 mb-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-gray-600 text-center">Your data is encrypted and never shared</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant</h3>
              <p className="text-gray-600 text-center">Get results in seconds, not days</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Accurate</h3>
              <p className="text-gray-600 text-center">Based on your actual portfolio data</p>
            </div>
          </div>
        </div>

        <div className="space-x-2 md:space-x-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/eligibility-check"
                className="btn btn-primary py-3 px-6 rounded-lg text-lg"
              >
                Check Eligibility
              </Link>
              <Link
                to="/eligibility-history"
                className="btn btn-secondary py-3 px-6 rounded-lg text-lg"
              >
                View History
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="btn btn-primary py-3 px-6 rounded-lg text-lg"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary py-3 px-6 rounded-lg text-lg"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;