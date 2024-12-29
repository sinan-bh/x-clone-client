"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiImage, FiAlignLeft, FiSmile, FiMapPin } from "react-icons/fi";
import { MdOutlineGifBox } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createTweet, fetchTweets } from "@/lib/store/thunks/tweet-thunk";
import { useAppDispatch } from "@/lib/store/hook";
import { User } from "@/components/side-bar/side-bar";
import { Button } from "@/components/ui/button";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { toast } from "react-toastify";

const PostInput: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const [tweetText, setTweetText] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [loginedUser, setLoginedUser] = useState<User>();
  const [isText, setIsText] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    setLoginedUser(user);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      toast.info("Please add some text or media to post.");
      return;
    }

    const createFormData = (
      userId: string,
      text: string,
      files: File[]
    ): FormData => {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("text", text);
      files.forEach((file) => {
        formData.append("media", file);
      });
      return formData;
    };

    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    if (!user.token) {
      toast.error("Authentication failed. Please log in.");
      router.push("/signin");
      return;
    }

    const formData = createFormData(user.id, tweetText, files);

    try {
      setIsPosting(true);
      await dispatch(createTweet(formData)).unwrap();
      toast.success("Tweet posted successfully!");
      dispatch(fetchTweets());
      setTweetText("");
      setFiles([]);
    } catch (error) {
      console.error("Error posting tweet:", error);
      toast.error("User not logined!!");
    } finally {
      setIsPosting(false);
      setIsText(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addEmoji = (emojiObject: any) => {
    setTweetText((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="bg-black p-4 rounded-lg border-b border-gray-700">
      <div className="flex justify-center">
        <div className="text-white text-4xl cursor-pointer">
          {loginedUser?.profilePicture ? (
            <Image
              src={loginedUser.profilePicture}
              width={100}
              height={100}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 text-white bg-green-700 text-2xl flex justify-center items-center rounded-full">
              {loginedUser?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="pl-5 flex-grow">
          <textarea
            placeholder="What is happening?!"
            value={tweetText}
            onChange={(e) => {
              setTweetText(e.target.value);
              setIsText(e.target.value.length < 1 ? false : true);
            }}
            className="w-full bg-transparent text-gray-300 placeholder-gray-500 outline-none text-lg"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4 pt-4">
          {files.map((file, index) => {
            const fileUrl = URL.createObjectURL(file);
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
                <Button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full text-sm opacity-0 group-hover:opacity-100"
                >
                  ✕
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-between pt-6">
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

          <div className="relative" ref={emojiPickerRef}>
            <FiSmile
              className="w-5 h-5 cursor-pointer hover:text-blue-400"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div className="absolute  left-0 z-50">
                <EmojiPicker onEmojiClick={addEmoji} theme={Theme.DARK} />
              </div>
            )}
          </div>

          <LuCalendarClock className="w-5 h-5 cursor-pointer hover:text-blue-400" />
          <FiMapPin className="w-5 h-5 cursor-pointer hover:text-blue-400" />
        </div>

        <Button
          onClick={handlePost}
          disabled={isPosting}
          className={`${
            isText
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-gray-600 hover:bg-gray-600"
          }  px-6 py-2 rounded-3xl`}
        >
          {isPosting ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default PostInput;
