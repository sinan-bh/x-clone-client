"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "@/components/home/tweets/tweet";
import Cookies from "js-cookie";
import { User } from "@/components/side-bar/side-bar";

interface TweetData {
  user: User;
  text: string;
  profilePicture: string;
  media?: string[];
  likes: string[];
  comments: string[];
  reposts: string[];
  createdAt: string;
}

const TweetList: React.FC = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tweets", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`, 
          },
          withCredentials: true,
        });
        setTweets(response.data.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);


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
