"use client";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaFeatherAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";

export type User = {
  id: string;
  name: string;
  userName: string;
  email?: string;
  profilePicture?: string;
};

const Sidebar: React.FC = () => {
  const [loginedUser, setLoginedUser] = useState<User>();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    console.log(user.profilePicture);

    setLoginedUser(user);
  }, []);

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
        <Link href={`/${loginedUser?.userName}`}>
          <FaUser className="text-2xl cursor-pointer hover:text-gray-500" />
        </Link>
        <BsThreeDots className="text-2xl cursor-pointer hover:text-gray-500" />
      </nav>
      <div className="flex items-center justify-center bg-gray-200 text-black text-2xl w-12 h-10 rounded-full cursor-pointer hover:bg-gray-300">
        <FaFeatherAlt />
      </div>
      <div className="text-white text-4xl cursor-pointer">
        <div>
          {loginedUser?.profilePicture ? (
            <Image
              src={loginedUser?.profilePicture}
              width={100}
              height={100}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 text-white bg-green-700 text-2xl flex justify-center items-center rounded-full">
              {loginedUser?.name && loginedUser?.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
