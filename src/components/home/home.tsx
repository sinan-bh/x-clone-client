import React from "react";
import NavBar from "@/components/home/navbar/navbar";
import SearchSection from "@/components/home/search-section/search-section";
import TweetList from "@/components/home/tweets/tweet-list";

export default function home() {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 border-r border-gray-600 sticky">
        <NavBar />
        <div className="overflow-y-scroll max-h-[91vh]">
          <TweetList />
        </div>
      </div>
      <div className="w-1/4">
        <SearchSection />
      </div>
    </div>
  );
}
