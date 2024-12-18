"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
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
import TabContent from "./tweets/tab-tweets";
import SearchSection from "../home/search-section/search-section";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { userDetails, isOwnProfile, followStatus } = useAppSelector(
    (state) => state.user
  );

  const [showModal, setShowModal] = useState(false);
  const { userName } = useParams<{ userName: string }>();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      dispatch(fetchUserData(userName));
      dispatch(setIsOwnProfile(user.userName === userName));
    }
  }, [userName, dispatch]);

  useEffect(() => {
    if (userDetails) {
      const currentUser = Cookies.get("user");
      const user = JSON.parse(currentUser || "{}");
      const isFollowing = userDetails?.followers?.some(
        (follower) => follower.userName === user.userName
      );
      dispatch(setFollowStatus(isFollowing ? "following" : "follow"));
    }
  }, [userDetails, dispatch]);

  const handleEditProfile = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFollow = async (followedUserId: string) => {
    const currentUser = Cookies.get("user");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      await dispatch(toggleFollow({ userId: user.id, followedUserId }));
      dispatch(
        setFollowStatus(followStatus === "follow" ? "following" : "follow")
      );
    }
  };

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const activeTab = pathname.includes("with_replies")
    ? "replies"
    : pathname.includes("likes")
    ? "likes"
    : "tweets";

  return (
    <div className="text-white flex">
      <div className="w-full sm:w-2/3">
        <div className="bg-transparent text-white py-4 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">{userName}</h1>
        </div>
        <div className="h-[90vh] hide-scrollbar overflow-y-auto">
          <div className="relative">
            <div className="h-56 bg-gray-300">
              {userDetails.bgImage && (
                <Image
                  src={userDetails.bgImage}
                  alt="Background Image"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            {userDetails.profilePicture ? (
              <div className="absolute -bottom-20 left-6 w-40 h-40 border-4 border-white rounded-full overflow-hidden">
                <Image
                  src={userDetails.profilePicture}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <div className="absolute -bottom-20 left-6 w-40 h-40 border-4 border-white rounded-full flex items-center justify-center text-5xl bg-gray-700 font-bold">
                {userDetails.name?.[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex justify-end m-4">
            <button
              className="bg-white text-black hover:bg-gray-200 border py-2 rounded-2xl px-10 text-sm"
              onClick={() =>
                isOwnProfile
                  ? handleEditProfile()
                  : handleFollow(userDetails._id)
              }
            >
              {isOwnProfile ? "Edit Profile" : followStatus}
            </button>
          </div>

          <div className="mt-12 px-6">
            <h2 className="text-xl font-bold">{userDetails.name}</h2>
            <p className="text-gray-600">@{userDetails.userName}</p>
            <p className="mt-2">{userDetails.bio}</p>
            <div className="text-gray-600 mt-3 flex items-center">
              <LuCalendarClock />
              <span className="ml-2">
                Joined{" "}
                {new Date(userDetails.createdAt).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex gap-4 mt-4">
              <Link href={`/${userName}/following`} className="hover:underline">
                <span className="font-bold">
                  {userDetails.following?.length}
                </span>{" "}
                <span className="text-gray-500">Following</span>
              </Link>
              <Link href={`/${userName}/followers`} className="hover:underline">
                <span className="font-bold">
                  {userDetails.followers?.length}
                </span>{" "}
                <span className="text-gray-500">Followers</span>
              </Link>
            </div>
          </div>

          <div className="flex justify-around border-b border-gray-600 mt-4">
            {["tweets", "replies", "likes"].map((tab) => (
              <Link
                key={tab}
                href={`/${userDetails.userName}/${
                  tab === "tweets"
                    ? ""
                    : tab === "replies"
                    ? "with_replies"
                    : "likes"
                }`}
                className={`relative py-2 text-center font-semibold ${
                  activeTab === tab ? "text-white" : "text-gray-400"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute left-0 right-0 h-1 bg-blue-500 top-9"></div>
                )}
              </Link>
            ))}
          </div>

          <TabContent activeTab={activeTab} userId={userDetails._id} />

          {showModal && (
            <EditProfileModal user={userDetails} onClose={handleCloseModal} />
          )}
        </div>
      </div>
      <div className="hidden sm:block">
        <SearchSection />
      </div>
    </div>
  );
};

export default ProfilePage;
