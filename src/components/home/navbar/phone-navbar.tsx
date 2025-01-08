"use client";

import React, { useState } from "react";

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-black p-4">
        <div
          className="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold cursor-pointer"
          onClick={toggleDropdown}
        >
          S
        </div>
        <div className="text-white text-xl">X</div>
        <button className="border border-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-800">
          Upgrade
        </button>
      </div>

      {/* Dropdown Section */}
      {isDropdownOpen && (
        <div className="absolute top-16 left-0 w-64 bg-black text-white shadow-lg rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
                S
              </div>
              <div className="ml-3">
                <p className="font-bold">Sinan BH</p>
                <p className="text-gray-400">@SinanBh</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              <span className="font-bold text-white">10</span> Following{" "}
              <span className="font-bold text-white">0</span> Followers
            </p>
          </div>
          <ul className="p-4 space-y-3">
            <li className="cursor-pointer hover:text-gray-400">Profile</li>
            <li className="cursor-pointer hover:text-gray-400">Premium</li>
            <li className="cursor-pointer hover:text-gray-400">Lists</li>
            <li className="cursor-pointer hover:text-gray-400">Bookmarks</li>
            <li className="cursor-pointer hover:text-gray-400">Verified Orgs</li>
            <li className="cursor-pointer hover:text-gray-400">Monetization</li>
            <li className="cursor-pointer hover:text-gray-400">Ads</li>
            <li className="cursor-pointer hover:text-gray-400">Jobs</li>
            <li className="cursor-pointer hover:text-gray-400">
              Settings and privacy
            </li>
            <li className="cursor-pointer hover:text-gray-400">Log out</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
