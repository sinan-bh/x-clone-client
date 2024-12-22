"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiImage, FiSmile } from "react-icons/fi";
import { MdGif } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";

const CommentPopup: React.FC = () => {
  const [commentText, setCommentText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const addEmoji = (emojiObject: { emoji: string }) => {
    setCommentText((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = () => {
    if (commentText.trim() === "") {
      toast.info("Comment cannot be empty");
      return;
    }
    toast.success(`Comment submitted: ${commentText}`);
    setCommentText("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-black text-white p-4 rounded-xl border border-gray-700 w-[500px] max-w-full">
        <div className="flex items-start gap-3 pb-4">
          <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full">
            S
          </div>
          <div>
            <p className="text-gray-300">
              Replying to <span className="text-blue-500">@UserHandle</span>
            </p>
            <textarea
              placeholder="Post your reply"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-transparent text-gray-300 placeholder-gray-500 outline-none text-lg p-2 mt-2 rounded-lg border border-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-4">
            <MdGif className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400" />
            <FiImage className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400" />
            <div className="relative">
              <FiSmile
                className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute z-50 bg-white rounded-lg shadow-md p-2 top-full left-0"
                >
                  <EmojiPicker onEmojiClick={addEmoji} />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className={`${
              commentText.trim() === ""
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-400"
            } px-6 py-2 rounded-full`}
            disabled={commentText.trim() === ""}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPopup;
