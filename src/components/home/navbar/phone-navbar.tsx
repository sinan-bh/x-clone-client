"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserDetails } from "@/lib/store/features/tweets-slice";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaUser, FaBook, FaLightbulb, FaSignOutAlt } from "react-icons/fa";
import { BsCardChecklist, BsTwitterX } from "react-icons/bs";
import {
  FaBagShopping,
  FaMoneyBillTransfer,
  FaUpRightFromSquare,
} from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import Logout from "@/components/side-bar/logout";

const Header: React.FC = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserDetails>();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    setUser(user);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    Cookies.remove("user");
    await signOut({ callbackUrl: "/" });
   
  };

  const handleClick = () => {
    setShowLogoutPopup(true);
    toggleDropdown();
  }

  return (
    <div className="relative ">
      <div className="flex items-center justify-between bg-black p-4 ">
        {user?.profilePicture && (
          <div
            className=" flex items-center justify-center rounded-full bg-green-500 text-white font-bold cursor-pointer"
            onClick={toggleDropdown}
          >
            <Image
              src={user?.profilePicture}
              alt="profile"
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
        )}
        <div className="text-white text-xl">
          <Image
            src={"/images/twitter-logo.png"}
            width={80}
            height={80}
            alt="logo"
          />
        </div>
        <button className="border border-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-800">
          Upgrade
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute h-screen top-20 left-0 w-64 bg-black text-white shadow-lg rounded-lg">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center mb-2">
              <div className="text-xl">
                <div className="font-bold">{user?.name}</div>
                <div className="text-gray-400">@{user?.userName}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              <span className="font-bold text-white">
                {user?.following?.length || 0}
              </span>{" "}
              Following{" "}
              <span className="font-bold text-white">
                {user?.followers?.length || 0}
              </span>{" "}
              Followers
            </p>
          </div>
          <div className="p-4 space-y-3 flex flex-col gap-5 ">
            <Link
              href={`/${user?.userName}`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex gap-2 items-center">
                <FaUser /> Profile
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <BsTwitterX />
                Premium
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <BsCardChecklist />
                Lists
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <FaBook />
                Bookmarks
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <FaLightbulb />
                Verified Orgs
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <FaMoneyBillTransfer />
                Monetization
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <FaUpRightFromSquare />
                Ads
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <FaBagShopping />
                Jobs
              </div>
            </Link>
            <Link
              href={`/home`}
              className="cursor-pointer hover:text-gray-400"
              onClick={toggleDropdown}
            >
              <div className="flex items-center gap-2">
                <IoSettingsSharp />
                Settings and privacy
              </div>
            </Link>
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-gray-400"
              onClick={handleClick}
            >
              <FaSignOutAlt />
              Log out
            </div>
            <div className="w-full border-t p-2 border-gray-600 "></div>
          </div>
        </div>
      )}

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

export default Header;
