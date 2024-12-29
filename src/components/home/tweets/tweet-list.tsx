"use client";

import React, { useEffect, useState } from "react";
import Tweet from "@/components/home/tweets/tweet";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
  fetchFollowingUserPost,
  fetchTweets,
} from "@/lib/store/thunks/tweet-thunk";

const TweetList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tweets, followingTweets, activeTab, loading } = useAppSelector(
    (state) => state.tweets
  );

  console.log(tweets, "ttt");

  const [isStatus, setIsStatus] = useState("");
  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("status") || "forYou");
    setIsStatus(status);
  }, [activeTab]);

  useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchFollowingUserPost());
  }, [activeTab, dispatch]);

  const posts = isStatus === "forYou" ? tweets : followingTweets;

  return (
    <div className="bg-black min-h-screen text-white">
      {loading ? (
        <div className="text-center text-gray-400">Loading tweets...</div>
      ) : (
        posts?.map((tweet, index) => <Tweet key={index} {...tweet} />)
      )}
    </div>
  );
};

export default TweetList;
