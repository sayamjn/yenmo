import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const authLinks = (
    <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
      <li>
        <Link 
          to="/dashboard" 
          className="block py-2 text-gray-700 hover:text-blue-600 transition duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link 
          to="/eligibility-check" 
          className="block py-2 text-gray-700 hover:text-blue-600 transition duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          Check Eligibility
        </Link>
      </li>
      <li>
        <Link 
          to="/eligibility-history" 
          className="block py-2 text-gray-700 hover:text-blue-600 transition duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          History
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            logout();
            setMobileMenuOpen(false);
          }}
          className="block py-2 text-gray-700 hover:text-red-600 transition duration-150"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
      <li>
        <Link 
          to="/login" 
          className="block py-2 text-gray-700 hover:text-blue-600 transition duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          Login
        </Link>
      </li>
      <li>
        <Link 
          to="/register" 
          className="block py-2 text-gray-700 hover:text-blue-600 transition duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            LoanCheck
          </Link>

          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:block">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 fade-in">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;