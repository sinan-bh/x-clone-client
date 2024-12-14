"use client";
import React from "react";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaFeatherAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsThreeDots, BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export type User = {
  userName: string;
  email?: string;
  password?: string;
};

const Sidebar: React.FC = () => {
  const router = useRouter();
  const handleProfile = () => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    router.push(`/${user?.userName}`);
  };

  return (
    <div className="flex flex-col py-4 justify-between max-w-60 items-end pr-5 border-r border-gray-600 h-screen">
      <Link href={"/home"} className="text-4xl font-bold pr-1">
        <FaXTwitter />
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
        <Link href={"/notification"}>
          <FaBell className="text-2xl cursor-pointer hover:text-gray-500" />
        </Link>
        <Link href={"/messages"}>
          <FaEnvelope className="text-2xl cursor-pointer hover:text-gray-500" />
        </Link>
        <FaUser
          className="text-2xl cursor-pointer hover:text-gray-500"
          onClick={handleProfile}
        />
        <BsThreeDots className="text-2xl cursor-pointer hover:text-gray-500" />
      </nav>
      <div className="flex items-center justify-center bg-gray-200 text-black text-2xl w-12 h-10 rounded-full cursor-pointer hover:bg-gray-300">
        <FaFeatherAlt />
      </div>
      <div className="text-white text-4xl cursor-pointer">
        <BsPersonCircle />
      </div>
    </div>
  );
};

export default Sidebar;
