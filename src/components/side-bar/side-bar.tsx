import React from "react";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserFriends,
  FaUser,
  FaFeatherAlt,
} from "react-icons/fa";
import { BsThreeDots, BsPersonCircle } from "react-icons/bs";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col  justify-between max-w-60 items-end pr-5 border-r border-gray-600 h-screen">
        <Link href={"/home"} className="text-4xl font-bold pr-3">
          X
        </Link>
        <nav className="flex flex-col gap-7 pr-3">
          <div className="relative group">
            <Link href={"/home"}>
              <FaHome className="text-2xl cursor-pointer group-hover:text-gray-500" />
            </Link>
            <span className="absolute top-1 right-[-5px] h-2 w-2 bg-blue-500 rounded-full"></span>
          </div>
          <Link href={"/explore"}>
            <FaSearch className="text-2xl cursor-pointer hover:text-gray-500" />
          </Link>
          <FaBell className="text-2xl cursor-pointer hover:text-gray-500" />
          <FaEnvelope className="text-2xl cursor-pointer hover:text-gray-500" />
          <FaUserFriends className="text-2xl cursor-pointer hover:text-gray-500" />
          <FaUser className="text-2xl cursor-pointer hover:text-gray-500" />
          <BsThreeDots className="text-2xl cursor-pointer hover:text-gray-500" />
        </nav>
        <div className="flex items-center justify-center bg-gray-200 text-black text-2xl w-12 h-10 rounded-full cursor-pointer hover:bg-gray-300">
          <FaFeatherAlt />
        </div>
        <div className="text-green-500 text-4xl cursor-pointer">
          <BsPersonCircle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
