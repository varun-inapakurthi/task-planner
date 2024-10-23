import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='border-8 border-t-8 border-gray-300 border-t-blue-600 rounded-full w-12 h-12 animate-spin'></div>
    </div>
  );
};

export default Loader;
