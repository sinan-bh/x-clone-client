"use client";

import React, { useEffect } from "react";
import SearchSection from "../home/search-section/search-section";
import FollowStatusUser from "./follow-status";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchUserData } from "@/lib/store/features/user-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";

const FollowStatus: React.FC = () => {
  const { userName, followStatus }: { userName: string; followStatus: string } =
    useParams();
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserData(userName));
  }, [dispatch, userName]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-full  py-4">
        <div className="px-6 flex flex-col gap-1">
          <Link
            href={`/${userDetails?.userName}`}
            className="text-xl hover:underline"
          >
            {userDetails?.name}
          </Link>
          <Link
            href={`/${userDetails?.userName}`}
            className="text-sm text-gray-500 hover:underline"
          >
            @{userDetails?.userName}
          </Link>
        </div>
        <header className="border-b border-gray-700 pb-4  mb-6 max-w-full hide-scrollbar overflow-x-auto text-nowrap">
          <nav className="flex justify-evenly space-x-4 mt-2">
            <Link
              href={`/${userName}/followers`}
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
              href={`/${userName}/following`}
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

        <FollowStatusUser userName={userName} followStatus={followStatus} />
      </div>
      <SearchSection />
    </div>
  );
};

export default FollowStatus;
