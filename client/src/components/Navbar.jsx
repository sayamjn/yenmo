import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const authLinks = (
    <ul className="flex space-x-4">
      <li>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/eligibility-check" className="text-gray-700 hover:text-blue-500">
          Check Eligibility
        </Link>
      </li>
      <li>
        <Link to="/eligibility-history" className="text-gray-700 hover:text-blue-500">
          History
        </Link>
      </li>
      <li>
        <button
          onClick={logout}
          className="text-gray-700 hover:text-red-500"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="flex space-x-4">
      <li>
        <Link to="/login" className="text-gray-700 hover:text-blue-500">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="text-gray-700 hover:text-blue-500">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Loan Eligibility App
        </Link>
        <div>{isAuthenticated ? authLinks : guestLinks}</div>
      </div>
    </nav>
  );
};

export default Navbar;