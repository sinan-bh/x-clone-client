"use client";

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

interface TweetProps {
  username: string;
  content: string;
  profilePic: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
}

const Tweet: React.FC<TweetProps> = ({
  username,
  content,
  profilePic,
  likesCount,
  commentsCount,
  repostsCount,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [reposts, setReposts] = useState(repostsCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleRepost = () => {
    setReposts(reposts + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="bg-black text-white border-b border-gray-700 p-4 flex space-x-4">
      <Image
        src={profilePic}
        alt={`${username}'s profile`}
        className="w-12 h-12 rounded-full"
        width={48}
        height={48}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">{username}</h3>
          <p className="text-xs text-gray-500">2h ago</p>
        </div>
        <p className="mt-2 text-sm">{content}</p>
        <div className="flex justify-around mt-4 text-gray-400">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FaComment />
            <span>{commentsCount}</span>
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
