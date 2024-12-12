import React from "react";
import { FiImage, FiAlignLeft, FiSmile, FiMapPin } from "react-icons/fi";
import { MdOutlineGifBox } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";

const PostInput: React.FC = () => {
  return (
    <div className="bg-black p-4 rounded-lg space-x-4 border-b border-gray-700">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full">
          <span className="text-lg font-semibold">S</span>
        </div>
        <div className="pl-5">
          <input
            type="text"
            placeholder="What is happening?!"
            className="flex-grow bg-transparent text-gray-300 placeholder-gray-500 outline-none text-lg"
          />
        </div>
      </div>
      <div className="flex justify-between pt-6">
        <div className="flex items-center space-x-3 text-blue-500">
          <FiImage className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <MdOutlineGifBox className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <FiAlignLeft className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <FiSmile className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <LuCalendarClock className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <FiMapPin className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        </div>

        <button className="bg-gray-600 text-gray-300 px-6 py-2 rounded-3xl hover:bg-gray-500">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostInput;
