import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetToast } from '../utils/toast';

type HeaderProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5001/auth/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      SetToast(error?.response?.data?.message);
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex flex-col sm:flex-row justify-between items-center shadow-md'>
      <h1 className='text-3xl font-extrabold tracking-tight mb-4 sm:mb-0'>
        Task Planner
      </h1>
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50'
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
