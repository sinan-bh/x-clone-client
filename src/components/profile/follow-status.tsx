"use client";

import { FollowUser } from "@/lib/store/features/user-slice";
import Image from "next/image";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

type FollowStatusUserProps = {
  users: FollowUser[];
};

export default function FollowStatusUser({ users }: FollowStatusUserProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleUnfollow = async (id: string) => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");

    await axios.put(`http://localhost:3001/api/user/${id}/${user?.id}`);
  };

  return (
    <div className="hide-scrollbar overflow-y-scroll h-[80vh]">
      {users.map((user) => (
        <div key={user._id} className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div>
                {user.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    width={100}
                    height={100}
                    alt="Profile Picture"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 text-black bg-green-700 text-2xl flex justify-center items-center rounded-full">
                    {user.name[0]}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-400">@{user.userName}</div>
              </div>
            </div>
            <div
              className={`text-white font-bold border rounded-3xl px-3 py-1 cursor-pointer ${
                isHovered ? "hover:border-red-900 hover:text-red-700" : ""
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => handleUnfollow(user._id)}
            >
              {isHovered ? "Unfollow" : "Following"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
