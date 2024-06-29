import React from 'react';

const TokenExpired = () => {
  const handleLoginRedirect = () => {
    localStorage.clear(); // Clear localStorage
    // Redirect to login page (replace with your login route)
    window.location.href = '/login';
  };

  return (
    <div           className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center h-full backdrop-blur-lg "
>
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div className="relative bg-white w-80 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Token Expired</h2>
        <p className="text-gray-700 mb-4">Your session token has expired. Please login again.</p>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
        >
          OK
        </button>
      </div>
    </div></div>
  );
};

export default TokenExpired;
