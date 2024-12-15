"use client";

import {
  fetchFollowersOrFollowing,
  setFollowStatus,
  toggleFollow,
} from "@/lib/store/features/user-slice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import Link from "next/link";

type FollowStatusUserProps = {
  userName: string;
  followStatus: string;
};

export default function FollowStatusUser({
  userName,
  followStatus,
}: FollowStatusUserProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loginedUser, setLoginedUser] = useState<string>("");
  const dispatch = useAppDispatch();

  const { followUsers, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    if (userName) {
      dispatch(fetchFollowersOrFollowing({ userName, followStatus }));
      setLoginedUser(user.userName);
    }
  }, [dispatch, userName, followStatus]);

  const handleFollowToggle = async (id: string, isFollowing: boolean) => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");

    const newFollowStatus = isFollowing ? "follow" : "following";
    dispatch(setFollowStatus(newFollowStatus));

    await dispatch(toggleFollow({ userId: user.id, followedUserId: id }));
    await dispatch(fetchFollowersOrFollowing({ userName, followStatus }));
  };

  if (status === "loading") {
    return <div>loading....</div>;
  }

  return (
    <div className="hide-scrollbar overflow-y-scroll h-[80vh] px-6">
      {!followUsers || followUsers.length > 0 ? (
        <div>
          {followUsers?.map((user) => {
            const currentUser = Cookies.get("user");
            const loggedInUser = JSON.parse(currentUser || "{}");
            const isFollowing = user.followers?.some(
              (f) => f === loggedInUser?.id
            );

            return (
              <div key={user._id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Link href={`/${user.userName}`}>
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          width={100}
                          height={100}
                          alt="Profile Picture"
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 text-black bg-green-700 text-2xl flex justify-center items-center rounded-full">
                          {user?.name && user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Link>
                    <div className="ml-3">
                      <Link
                        href={`/${user.userName}`}
                        className="font-bold hover:underline"
                      >
                        {user.name}
                      </Link>
                      <div className="text-sm text-gray-400">
                        @{user.userName}
                      </div>
                      <div className="text-white">{user.bio}</div>
                    </div>
                  </div>
                  {loginedUser !== user?.userName && (
                    <div
                      className={`text-black bg-white font-bold border rounded-3xl px-3 py-1 cursor-pointer ${
                        isFollowing
                          ? isHovered
                            ? "hover:border-red-900 hover:text-red-700 hover:bg-transparent"
                            : ""
                          : isHovered
                          ? "hover:bg-gray-200"
                          : ""
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() =>
                        handleFollowToggle(user._id || "", !!isFollowing)
                      }
                    >
                      {isFollowing
                        ? isHovered
                          ? "Unfollow"
                          : "Following"
                        : "Follow"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-full flex flex-col items-center">
          <div className="text-4xl text-pretty max-w-80 text-white font-bold mt-10">
            Looking <span className="pl-3"> for </span>
            followers?
          </div>
          <div className="text-gray-500 max-w-80 mt-2">
            When someone follows this account, they’ll show up here. Posting and
            interacting with others helps boost followers.
          </div>
        </div>
      )}
    </div>
  );
}
