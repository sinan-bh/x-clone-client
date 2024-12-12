import React from "react";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaPen,
  FaUserFriends,
  FaUser,
  FaFeatherAlt,
} from "react-icons/fa";
import { BsThreeDots, BsPersonCircle } from "react-icons/bs";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-screen items-center">
      <div className="text-4xl font-bold">X</div>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-8">
        <div className="relative group">
          <FaHome className="text-2xl cursor-pointer group-hover:text-gray-500" />
          <span className="absolute top-1 right-[-5px] h-2 w-2 bg-blue-500 rounded-full"></span>
        </div>
        <FaSearch className="text-2xl cursor-pointer hover:text-gray-500" />
        <FaBell className="text-2xl cursor-pointer hover:text-gray-500" />
        <FaEnvelope className="text-2xl cursor-pointer hover:text-gray-500" />
        <FaPen className="text-2xl cursor-pointer hover:text-gray-500" />
        <FaUserFriends className="text-2xl cursor-pointer hover:text-gray-500" />
        <FaUser className="text-2xl cursor-pointer hover:text-gray-500" />
        <BsThreeDots className="text-2xl cursor-pointer hover:text-gray-500" />
      </nav>

      {/* New Post Button */}
      <div className="flex items-center justify-center bg-gray-200 text-black text-2xl w-12 h-12 rounded-full cursor-pointer hover:bg-gray-300">
        <FaFeatherAlt />
      </div>

      {/* Profile Icon */}
      <div className="text-green-500 text-4xl cursor-pointer">
        <BsPersonCircle />
      </div>
    </div>
  );
};

export default Sidebar;
