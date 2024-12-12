import React from "react";
import Tweet from "@/components/home/tweets/tweet";

const tweets = [
  {
    username: "Kritika Singh",
    content: "If you're a developer, let's #connect!",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 24,
    commentsCount: 12,
    repostsCount: 3,
  },
  {
    username: "Jane Doe",
    content: "Learning React.js is fun! 🎉",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 50,
    commentsCount: 20,
    repostsCount: 8,
  },
  {
    username: "Jane Doe",
    content: "Learning React.js is fun! 🎉",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 50,
    commentsCount: 20,
    repostsCount: 8,
  },
  {
    username: "Jane Doe",
    content: "Learning React.js is fun! 🎉",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 50,
    commentsCount: 20,
    repostsCount: 8,
  },
  {
    username: "Jane Doe",
    content: "Learning React.js is fun! 🎉",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 50,
    commentsCount: 20,
    repostsCount: 8,
  },
  {
    username: "Jane Doe",
    content: "Learning React.js is fun! 🎉",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 50,
    commentsCount: 20,
    repostsCount: 8,
  },
  {
    username: "Jane Doe",
    content: "Learning React.js is fun! 🎉",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 50,
    commentsCount: 20,
    repostsCount: 8,
  },
  {
    username: "Jane Doe",
    content: "Learning React.js is fun! 🎉",
    profilePic: "https://via.placeholder.com/48",
    likesCount: 50,
    commentsCount: 20,
    repostsCount: 8,
  },
];

const TweetList: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      {tweets.map((tweet, index) => (
        <Tweet key={index} {...tweet} />
      ))}
    </div>
  );
};

export default TweetList;
