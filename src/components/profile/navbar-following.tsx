"use client";
import React, { useEffect, useState } from "react";
import SearchSection from "../home/search-section/search-section";
import FollowStatusUser from "./follow-status";
import { useParams } from "next/navigation";
import axios from "axios";
import { FollowUser } from "@/lib/store/features/user-slice";
import Link from "next/link";

const FollowStatus: React.FC = () => {
  const {
    profileId,
    followStatus,
  }: { profileId: string; followStatus: string } = useParams();
  const [users, setUsers] = useState<FollowUser[] | null>(null);

  useEffect(() => {
    const fetchFollowersOrFollowing = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/user/${profileId}?status=${followStatus}`
        );

        // Set users based on activeTab
        setUsers(
          followStatus === "followers"
            ? data.data.followers
            : data.data.following
        );
      } catch (error) {
        console.error("Error fetching followers or following:", error);
      }
    };

    fetchFollowersOrFollowing();
  }, [followStatus, profileId]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-full px-6 py-4">
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
        <header className="border-b border-gray-700 pb-4 pt-7 mb-6 max-w-full hide-scrollbar overflow-x-auto text-nowrap">
          <nav className="flex justify-evenly space-x-4 mt-2">
            <Link
              href={`/${profileId}/followers`}
              className={`relative text-gray-400 font-medium cursor-pointer ${
                followStatus === "followers" ? "text-white" : "text-gray-400"
              }`}
            >
              Followers
              {followStatus === "followers" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </Link>
            <Link
              href={`/${profileId}/following`}
              className={`relative text-gray-400 font-medium cursor-pointer ${
                followStatus === "following" ? "text-white" : "text-gray-400"
              }`}
            >
              Following
              {followStatus === "following" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </Link>
          </nav>
        </header>
        {users ? <FollowStatusUser users={users} /> : <div>Loading...</div>}
      </div>

      <SearchSection />
    </div>
  );
};

export default FollowStatus;
