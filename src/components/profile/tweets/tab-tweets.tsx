"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
  fetchLikedTweets,
  fetchUserTweet,
} from "@/lib/store/thunks/tweet-thunk";
import { useParams } from "next/navigation";
import Tweet from "@/components/home/tweets/tweet";
import Comments from "./comments";
import { fetchComments } from "@/lib/store/thunks/comments-thunk";
import { CircularProgress } from "@mui/material";

interface TabContentProps {
  activeTab: "tweets" | "replies" | "likes";
  userId: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, userId }) => {
  const { userName }: { userName: string } = useParams();
  const { userTweet, userLikes, loading, error } = useAppSelector(
    (state) => state.tweets
  );
  const { comments, pendign, err } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userName) {
      dispatch(fetchUserTweet(userId));
      dispatch(fetchComments());
      dispatch(fetchLikedTweets());
    }
  }, [dispatch, userName, userId]);

  const renderContent = () => {
    if (loading || pendign)
      return (
        <div className="flex justify-center items-center max-h-full">
          <CircularProgress size={60} />
        </div>
      );
    if (error || err) return <div className="text-red-500">{error}</div>;

    switch (activeTab) {
      case "tweets":
        return userTweet?.map((tweet) => (
          <Tweet key={tweet.createdAt} {...tweet} />
        ));

      case "replies":
        return comments?.map((comment) => (
          <Comments key={comment._id} comments={comment || null} />
        ));

      case "likes":
        return userLikes?.map((tweet, i) => <Tweet key={i} {...tweet} />);

      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default TabContent;
