import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-indigo-600 mb-8 animate-bounce">404</h1>
        
        {/* Error Message */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          Oops! It seems like you've wandered off the path. The page you're looking 
          for doesn't exist or might have been moved.
        </p>

        {/* Back Home Button */}
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg 
                    hover:bg-indigo-700 transition duration-300 ease-in-out transform 
                    hover:-translate-y-1 hover:shadow-lg"
        >
          Return Home
        </Link>

        {/* Optional Fun Element */}
        <div className="mt-12">
          <svg 
            className="w-32 h-32 mx-auto text-gray-400 animate-spin-slow" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Error404;