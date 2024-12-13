"use client";
import React, { useState } from "react";

type ActiveTab = "forYou" | "trending" | "news" | "sports" | "entertainment";

const Explore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("forYou");

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-2/3 px-6 py-4">
        <div>
          <div>
            <svg
              className="absolute top-4 pl-3 w-9 h-10 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-4.35-4.35M10 4a6 6 0 100 12 6 6 0 000-12z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-700 text-gray-300 py-2 px-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:pl-8"
            />
          </div>
        </div>
        <header className="border-b border-gray-700 pb-4 mb-6">
          <nav className="flex justify-between space-x-4 mt-2">
            <div
              className={`relative text-gray-400 font-medium cursor-pointer ${
                activeTab === "forYou" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("forYou")}
            >
              For You
              {activeTab === "forYou" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </div>
            <div
              className={`relative text-gray-400 font-medium cursor-pointer ${
                activeTab === "trending" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("trending")}
            >
              Trending
              {activeTab === "trending" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </div>
            <div
              className={`relative text-gray-400 font-medium cursor-pointer ${
                activeTab === "news" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("news")}
            >
              News
              {activeTab === "news" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </div>
            <div
              className={`relative text-gray-400 font-medium cursor-pointer ${
                activeTab === "sports" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("sports")}
            >
              Sports
              {activeTab === "sports" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </div>
            <div
              className={`relative text-gray-400 font-medium cursor-pointer ${
                activeTab === "entertainment" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("entertainment")}
            >
              Entertainment
              {activeTab === "entertainment" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </div>
          </nav>
        </header>
        <div className="hide-scrollbar overflow-y-scroll h-[80vh]">
          <div className="mb-6 ">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">
                Billboard Music Awards 2024
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Presented by Marriott Bonvoy
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Thurs Dec 12 | Watch live at 8 PM ET
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Trending in India</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="font-medium">#GukeshDing</p>
              <p className="text-gray-400 text-sm">55.1K posts</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <p className="font-medium">#BoycottBollywood</p>
              <p className="text-gray-400 text-sm">Entertainment · Trending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Who to Follow */}
      <aside className="w-1/3 px-6 py-4 border-l border-gray-700">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div className="ml-3">
              <p className="font-medium">Tovino Thomas</p>
              <p className="text-sm text-gray-400">@ttovino</p>
            </div>
          </div>
          <button className="bg-white text-black px-4 py-1 rounded-lg text-sm">
            Following
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div className="ml-3">
              <p className="font-medium">Aju Varghese</p>
              <p className="text-sm text-gray-400">@AjuVarghese</p>
            </div>
          </div>
          <button className="bg-white text-black px-4 py-1 rounded-lg text-sm">
            Following
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div className="ml-3">
              <p className="font-medium">SportsCenter</p>
              <p className="text-sm text-gray-400">@SportsCenter</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm">
            Follow
          </button>
        </div>

        <a href="#" className="text-blue-500 text-sm">
          Show more
        </a>
      </aside>
    </div>
  );
};

export default Explore;
