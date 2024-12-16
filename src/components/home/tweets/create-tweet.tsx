"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiImage, FiAlignLeft, FiSmile, FiMapPin } from "react-icons/fi";
import { MdOutlineGifBox } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const PostInput: React.FC = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [tweetText, setTweetText] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!tweetText && files.length === 0) {
      alert("Please add some text or media to post.");
      return;
    }

    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    if (!user.token) {
      alert("Authentication failed. Please log in.");
      router.push("/signin");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("text", tweetText);
    files.forEach((file) => {
      formData.append("media", file);
    });

    try {
      setIsPosting(true);

      const response = await axios.post(
        "http://localhost:3001/api/tweets",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`, // Include token here
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data?.status === "success") {
        console.log("Tweet posted successfully:", response.data);
        alert("Tweet posted successfully!");
        setTweetText("");
        setFiles([]);
      } else {
        console.error("Failed to post tweet:", response.data.error);
        alert("Failed to post tweet. Please try again.");
      }
    } catch (error) {
      console.error("Error posting tweet:", error);
      alert("Error posting tweet. Please check the console for more details.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-black p-4 rounded-lg border-b border-gray-700">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full">
          <span className="text-lg font-semibold">S</span>
        </div>
        <div className="pl-5 flex-grow">
          <input
            type="text"
            placeholder="What is happening?!"
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            className="w-full bg-transparent text-gray-300 placeholder-gray-500 outline-none text-lg"
          />
        </div>
      </div>

      {/* Media Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4 pt-4">
          {files.map((file, index) => {
            const fileUrl = URL.createObjectURL(file); // Generate URL for the file
            let preview;

            if (file.type.startsWith("image/")) {
              preview = (
                <Image
                  src={fileUrl}
                  alt={`Uploaded image ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full rounded-lg"
                />
              );
            } else if (file.type.startsWith("video/")) {
              preview = (
                <video
                  controls
                  src={fileUrl}
                  className="object-cover w-full h-full rounded-lg"
                />
              );
            } else if (file.type.startsWith("audio/")) {
              preview = (
                <audio
                  controls
                  src={fileUrl}
                  className="w-full h-full rounded-lg"
                />
              );
            }

            return (
              <div key={index} className="relative group">
                {preview}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full text-sm opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-between pt-6">
        {/* Icons */}
        <div className="flex items-center space-x-3 text-blue-500">
          <label htmlFor="file-upload" className="cursor-pointer">
            <FiImage className="w-5 h-5 hover:text-blue-400" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*,video/*,audio/*"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          <MdOutlineGifBox className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <FiAlignLeft className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <FiSmile className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <LuCalendarClock className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <FiMapPin className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        </div>

        <button
          onClick={handlePost}
          disabled={isPosting}
          className={`${
            isPosting ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-500"
          } text-gray-300 px-6 py-2 rounded-3xl`}
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostInput;
