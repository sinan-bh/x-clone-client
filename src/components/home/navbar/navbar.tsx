"use client";

import React, { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("status") || "forYou");
    console.log(status);

    setActiveTab(status);
  }, [activeTab]);

  return (
    <div className="flex items-center justify-around bg-black text-white h-16 border-b border-gray-700">
      <div className="flex w-1/2 justify-between">
        <div
          className={`relative text-sm font-semibold cursor-pointer ${
            activeTab === "forYou" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => {
            setActiveTab("forYou");
            localStorage.setItem("status", JSON.stringify("forYou"));
          }}
        >
          For you
          {activeTab === "forYou" && (
            <div className="absolute  left-0 right-0 h-1 bg-blue-500 rounded-t-md  top-9"></div>
          )}
        </div>
        <div
          className={`relative text-sm font-semibold cursor-pointer ${
            activeTab === "following" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => {
            setActiveTab("following");
            localStorage.setItem("status", JSON.stringify("following"));
          }}
        >
          Following
          {activeTab === "following" && (
            <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
