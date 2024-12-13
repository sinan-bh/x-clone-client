"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

type User = {
  createdAt: string;
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  updatedAt: string;
  userName: string;
};

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tweets" | "replies" | "likes">(
    "tweets"
  );
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const { profileId }: { profileId: string } = useParams();

  useEffect(() => {
    const storedUser = localStorage.getItem("loginedUser");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      setUserDetails(user);
      setIsOwnProfile(profileId === user.userName);
    }
  }, [profileId]);

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen text-white">
      <div className="bg-transparent text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>
      <div className="h-full hide-scrollbar overflow-y-auto">
        <div className="relative">
          <div className="h-56 bg-gray-300"></div>
          {userDetails.profilePicture ? (
            <div className="absolute -bottom-20 bg-green-700  text-white text-3xl font-extrabold flex justify-center items-center left-6 w-40 h-40 border-4 border-white rounded-full overflow-hidden">
              {userDetails.profilePicture}
            </div>
          ) : (
            <div className="absolute -bottom-20 left-6 w-40 h-40 border-4 border-white rounded-full overflow-hidden">
              <Image
                src={"https://via.placeholder.com/150"}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end m-4 cursor-pointer">
          <div
            className={`bg-white text-black hover:bg-gray-200 border py-2 rounded-2xl px-10 text-sm`}
          >
            {isOwnProfile ? "Edit Profile" : "Follow"}
          </div>
        </div>

        <div className="mt-12 px-6">
          <h2 className="text-xl font-bold">{userDetails.name}</h2>
          <p className="text-gray-600">@{userDetails.userName}</p>
          <p className="mt-2">Building cool stuff on the internet.</p>

          <div className="flex gap-4 mt-4">
            <span>
              <span className="font-bold">120</span> Following
            </span>
            <span>
              <span className="font-bold">500</span> Followers
            </span>
          </div>
        </div>

        <div className="flex justify-around border-b mt-4">
          <div
            className={`relative py-2 text-center font-semibold cursor-pointer ${
              activeTab === "tweets" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("tweets")}
          >
            Tweets
            {activeTab === "tweets" && (
              <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
            )}
          </div>
          <div
            className={`relative py-2 text-center font-semibold cursor-pointer ${
              activeTab === "replies" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("replies")}
          >
            Replies
            {activeTab === "replies" && (
              <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
            )}
          </div>
          {isOwnProfile && (
            <div
              className={`relative py-2 text-center font-semibold cursor-pointer ${
                activeTab === "likes" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("likes")}
            >
              Likes
              {activeTab === "likes" && (
                <div className="absolute left-0 right-0 h-1 bg-blue-500 rounded-t-md top-9"></div>
              )}
            </div>
          )}
        </div>

        <div className="mt-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-black border-b p-4 shadow mb-4 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={"https://via.placeholder.com/48"}
                    alt="Avatar"
                    objectFit="cover"
                    width={150}
                    height={150}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{userDetails.name}</h3>
                    <span className="text-gray-500 text-sm">
                      @{userDetails.userName}
                    </span>
                    <span className="text-gray-500 text-sm">- 2h</span>
                  </div>
                  <p className="mt-1 text-gray-700">
                    This is a sample tweet content for demonstration purposes.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
