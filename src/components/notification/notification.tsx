import React from "react";
import SearchSection from "../home/search-section/search-section";

export default function Notification() {
  return (
    <div className="bg-black flex">
      <div className="w-[83vw] sm:max-w-1/2">
        <div className="text-white text-2xl font-bold h-28 flex p-4 border-gray-600 border-b">
          Notifications
        </div>
        <div className="flex min-h-screen flex-col items-center  max-w-full p-4 hide-scrollbar">
          <div className="text-3xl font-extrabold">
            Nothing to see here —
            <br /> yet
          </div>
          <div className="text-lg pt-4 text-gray-500">
            From likes to reposts and a whole lot more, this
            <br /> is where all the action happens.
          </div>
        </div>
      </div>
      <div className="hidden md:block sm:w-1/2">
        <SearchSection />
      </div>
    </div>
  );
}
