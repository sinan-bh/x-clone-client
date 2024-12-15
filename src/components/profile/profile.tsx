"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { LuCalendarClock } from "react-icons/lu";
import EditProfileModal from "./edit-profile";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
  fetchUserData,
  setFollowStatus,
  setIsOwnProfile,
  toggleFollow,
} from "@/lib/store/features/user-slice";
import Link from "next/link";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"tweets" | "replies" | "likes">(
    "tweets"
  );
  const { userDetails, isOwnProfile, followStatus } = useAppSelector(
    (state) => state.user
  );
  const [showModal, setShowModal] = useState(false);

  const { profileId }: { profileId: string } = useParams();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");

    dispatch(fetchUserData(profileId));
    dispatch(setIsOwnProfile(user.userName === profileId));
  }, [profileId, dispatch]);

  const handleEditProfile = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFollow = async (followedUserId: string) => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    const newFollowStatus =
      followStatus === "following" ? "follow" : "following";
    dispatch(setFollowStatus(newFollowStatus));
    await dispatch(toggleFollow({ userId: user.id, followedUserId }));
  };

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
        <h1 className="text-xl font-bold">{profileId}</h1>
      </div>
      <div className="h-full hide-scrollbar overflow-y-auto">
        <div className="relative">
          <div className="h-56 bg-gray-300">
            {userDetails.bgImage && (
              <Image
                src={userDetails.bgImage}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          {userDetails?.profilePicture ? (
            <div className="absolute -bottom-20 bg-green-700 text-white text-3xl font-extrabold flex justify-center items-center left-6 w-40 h-40 border-4 border-white rounded-full overflow-hidden">
              <Image
                src={userDetails?.profilePicture}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="absolute -bottom-20 left-6 w-40 h-40 border-4 border-white rounded-full overflow-hidden flex justify-center items-center text-5xl bg-gray-700 text-white font-bold">
              {userDetails?.name ? userDetails?.name[0].toUpperCase() : ""}
            </div>
          )}
        </div>
        <div className="flex justify-end m-4 cursor-pointer">
          <div
            className="bg-white text-black hover:bg-gray-200 border py-2 rounded-2xl px-10 text-sm"
            onClick={() =>
              isOwnProfile ? handleEditProfile() : handleFollow(userDetails._id)
            }
          >
            {isOwnProfile ? "Edit Profile" : followStatus}
          </div>
        </div>

        <div className="mt-12 px-6">
          <h2 className="text-xl font-bold">{userDetails?.name}</h2>
          <p className="text-gray-600">@{userDetails?.userName}</p>
          <p className="mt-2">{userDetails?.bio}</p>
          <div className="text-gray-600 mt-3 text-lg flex items-center">
            <LuCalendarClock />
            <span className="ml-2">Joined </span>
            <span className="ml-2">
              {new Date(userDetails?.createdAt).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex gap-4 mt-4">
            <Link href={`/${profileId}/following`} className="hover:underline">
              <span className="font-bold">
                {userDetails?.following?.length}
              </span>{" "}
              <span className="text-gray-500">Following</span>
            </Link>
            <Link href={`/${profileId}/followers`} className="hover:underline">
              <span className="font-bold">
                {userDetails?.followers?.length}
              </span>{" "}
              <span className="text-gray-500">Followers</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-around border-b border-gray-600 mt-4">
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
          {/* {activeTab === "tweets" &&
            tweets?.map((tweet, index) => (
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
                    <p className="mt-1 text-gray-700">{tweet}</p>
                  </div>
                </div>
              </div>
            ))} */}
        </div>
        {showModal && (
          <EditProfileModal user={userDetails} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
