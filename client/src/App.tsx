import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import SignupLogin from './components/SignupLogin';
import Home from './components/Home';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route path='/login' element={<SignupLogin />} />
          <Route path='/signup' element={<SignupLogin />} />
          <Route
            path='/'
            element={<Home setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </Router>
  );
}

export default App;
