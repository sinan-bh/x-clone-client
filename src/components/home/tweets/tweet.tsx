"use client";

import { User } from "@/components/side-bar/side-bar";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaRetweet,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";

interface TweetProps {
  user: User;
  text: string;
  media?: string[];
  likes: string[];
  comments: string[];
  reposts: string[];
  createdAt: string;
}

const Tweet: React.FC<TweetProps> = ({
  user,
  text,
  media,
  likes,
  comments,
  reposts,
  createdAt,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [repost, setRepost] = useState(reposts.length);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleRepost = () => {
    setRepost(repost + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const getTimeAgo = (time: string) => {
    const postTime = parseISO(time);
    const timeAgo = formatDistanceToNow(postTime, { addSuffix: true });

    if (timeAgo.includes("day")) {
      const daysAgo = formatDistanceToNow(postTime);
      if (daysAgo === "1 day") {
        return "Yesterday";
      } else {
        return daysAgo;
      }
    }

    return timeAgo;
  };

  return (
    <div className="bg-black text-white border-b border-gray-700 p-4 flex space-x-4">
      <Link href={`/${user?.userName}`}>
        {user?.profilePicture ? (
          <Image
            src={user?.profilePicture}
            alt={`${user?.userName}'s profile`}
            className="w-12 h-12 rounded-full"
            width={48}
            height={48}
          />
        ) : (
          <div className="w-12 h-12 text-white bg-green-700 text-2xl flex justify-center items-center rounded-full">
            {user?.name && user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </Link>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={`/${user?.userName}`}
              className="font-bold hover:underline"
            >
              {user?.name}
            </Link>
            <Link href={`/${user?.userName}`} className="text-gray-500 pl-2">
              @{user?.userName}
            </Link>
          </div>
          <p className="text-xs text-gray-500">{getTimeAgo(createdAt)}</p>
        </div>
        <p className="mt-2 text-sm">{text}</p>
        {media && (
          <div>
            {media.map((m, i) => (
              <div key={i}>
                <Image
                  src={m || ""}
                  alt="no post"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-3xl"
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-around mt-4 text-gray-400">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>{likesCount}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FaComment />
            <span>{comments.length}</span>
          </button>
          <button
            onClick={handleRepost}
            className="flex items-center space-x-1 hover:text-green-500"
          >
            <FaRetweet />
            <span>{reposts}</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 hover:text-yellow-500"
          >
            {saved ? (
              <FaBookmark className="text-yellow-500" />
            ) : (
              <FaRegBookmark />
            )}
            <span>{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
