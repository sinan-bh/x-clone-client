"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { fetchUserTweet } from "@/lib/store/features/tweets-slice";
import { useParams } from "next/navigation";
import Tweet from "@/components/home/tweets/tweet";

interface TabContentProps {
  activeTab: "tweets" | "replies" | "likes";
  userId: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, userId }) => {
  const { profileId }: { profileId: string } = useParams();
  const { userTweet, loading, error } = useAppSelector((state) => state.tweets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profileId) {
      dispatch(fetchUserTweet(userId));
    }
  }, [dispatch, profileId, userId]);

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    switch (activeTab) {
      case "tweets":
        return userTweet?.map((tweet) => (
          <Tweet key={tweet.createdAt} {...tweet} />
        ));

      case "replies":
        return userTweet?.map((tweet) => (
          <Tweet key={tweet.createdAt} {...tweet} />
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
