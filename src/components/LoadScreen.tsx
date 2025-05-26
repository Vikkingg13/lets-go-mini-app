import React from 'react';

const LoadScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            LetsGo
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadScreen; 