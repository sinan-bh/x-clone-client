"use client";

import React from "react";

interface LogoutProps {
  onLogout: () => void;
  onCancel: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout,onCancel }) => {

  return (
    <div className="bg-black rounded-lg p-6 shadow-lg text-center">
      <h2 className="text-lg font-bold mb-4 text-white">
        Are you sure you want to log out?
      </h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Yes, Logout
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
