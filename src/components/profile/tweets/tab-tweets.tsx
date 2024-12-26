"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { fetchComments, fetchUserTweet } from "@/lib/store/thunks/tweet-thunk";
import { useParams } from "next/navigation";
import Tweet from "@/components/home/tweets/tweet";
import Comments from "./comments";

interface TabContentProps {
  activeTab: "tweets" | "replies" | "likes";
  userId: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, userId }) => {
  const { userName }: { userName: string } = useParams();
  const { userTweet, comments, loading, error } = useAppSelector(
    (state) => state.tweets
  );
  const dispatch = useAppDispatch();

  console.log(userTweet);

  useEffect(() => {
    if (userName) {
      dispatch(fetchUserTweet(userId));
      dispatch(fetchComments());
    }
  }, [dispatch, userName, userId]);

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

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
        return userTweet
          ?.filter((tweet) => tweet.likes)
          .map((tweet) => <Tweet key={tweet.createdAt} {...tweet} />);

      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default TabContent;
