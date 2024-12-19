"use client";

import React, { useEffect } from "react";
import Tweet from "@/components/home/tweets/tweet";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { fetchTweets } from "@/lib/store/features/tweets-slice";

const TweetList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tweets, loading } = useAppSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <div className="bg-black min-h-screen text-white">
      {loading ? (
        <div className="text-center text-gray-400">Loading tweets...</div>
      ) : (
        tweets?.map((tweet, index) => <Tweet key={index} {...tweet} />)
      )}
    </div>
  );
};

export default TweetList;
