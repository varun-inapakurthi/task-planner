import React, { useState, useEffect } from 'react';
import { User, UserPlus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SetToast } from '../utils/toast';

import { Calendar, Clock, CheckSquare } from 'lucide-react';
import axiosInstance from '../utils/axios';

const SignupLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axiosInstance.get('/auth/verify', {
          withCredentials: true,
        });
        navigate('/');
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };
    verifyUser();
  }, [navigate]);

  useEffect(() => {
    const path = location.pathname;
    setIsLogin(path === '/login');
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/auth/login' : '/auth/signup';
      await axiosInstance.post(
        url,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      navigate('/');
    } catch (error) {
      SetToast(error?.response?.data?.message);
      console.error(error.response.data.message);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <header className='container mx-auto px-4 py-6 text-center'>
        <h1 className='text-5xl font-extrabold mb-6 text-gray-800'>
          Welcome to <span className='text-indigo-600'>Task Planner</span>
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Your all-in-one solution for efficient task planning
        </p>
      </header>

      <section className='max-h-fit flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
        <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
          <div className='flex justify-center mb-6'>
            {isLogin ? (
              <User size={48} className='text-indigo-600' />
            ) : (
              <UserPlus size={48} className='text-indigo-600' />
            )}
          </div>
          <h2 className='text-3xl font-extrabold mb-6 text-center text-gray-800'>
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-2'
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-sm font-semibold text-gray-700 mb-2'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition duration-200 ease-in-out'
                placeholder='Enter your password'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out'
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <p className='mt-6 text-center text-sm text-gray-600'>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => navigate(isLogin ? '/signup' : '/login')}
              className='text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200 ease-in-out'
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </section>
      <section className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold text-center mb-12 text-gray-800'>
          Key Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              icon: Calendar,
              title: 'Monthly Calendar View',
              description: 'Get a broad overview of your tasks',
            },
            {
              icon: Clock,
              title: 'Weekly Planner',
              description: 'Dive into detailed weekly schedules',
            },
            {
              icon: CheckSquare,
              title: 'Task Management',
              description: 'Create, edit, and prioritize tasks with ease',
            },
          ].map((feature, index) => (
            <div key={index} className='bg-white p-6 rounded-xl shadow-md'>
              <feature.icon className='text-indigo-600 mb-4' size={32} />
              <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className='bg-gray-800 text-white py-8'>
        <div className='container mx-auto px-4 text-center'>
          <p>
            &copy; {new Date().getFullYear()} Task Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignupLogin;
