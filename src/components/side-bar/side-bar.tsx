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
import Logout from "./logout";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  name: string;
  userName: string;
  email?: string;
  profilePicture?: string;
};

const Sidebar: React.FC = () => {
  const [loginedUser, setLoginedUser] = useState<User | null>(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setLoginedUser(user);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    router.push("/signin");
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
          {/* <span className="absolute top-1 right-[-5px] h-2 w-2 bg-blue-500 rounded-full"></span> */}
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

      {/* Tweet Button */}
      <div className="flex items-center justify-center bg-gray-200 text-black text-2xl w-12 h-10 rounded-full cursor-pointer hover:bg-gray-300">
        <FaFeatherAlt />
      </div>

      {/* Profile Section */}
      <div
        className="text-white text-4xl cursor-pointer"
        onClick={() => setShowLogoutPopup(true)}
      >
        {loginedUser?.profilePicture ? (
          <Image
            src={loginedUser.profilePicture}
            width={100}
            height={100}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 text-white bg-green-700 text-2xl flex justify-center items-center rounded-full">
            {loginedUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <Logout
            onLogout={() => {
              handleLogout();
              setShowLogoutPopup(false);
            }}
            onCancel={() => setShowLogoutPopup(false)}
          />
          <button
            onClick={() => setShowLogoutPopup(false)}
            className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
