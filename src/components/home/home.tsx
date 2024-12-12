import React from "react";
import NavBar from "@/components/home/navbar/navbar";
import SearchSection from "@/components/home/search-section/search-section";
import TweetList from "@/components/home/tweets/tweet-list";
import PostInput from "./tweets/create-tweet";

export default function home() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-[83vw] sm:w-1/2 border-r border-gray-600 sticky">
        <NavBar />
        <div className="hide-scrollbar overflow-y-scroll w-[80vw] sm:w-full max-h-[91vh]">
          <PostInput />
          <TweetList />
        </div>
      </div>
      <div className="hidden md:block sm:w-1/4">
        <SearchSection />
      </div>
    </div>
  );
}
