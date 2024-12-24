import React, { useState, useEffect, useRef } from "react";
import { FiImage, FiSmile } from "react-icons/fi";
import { MdGif } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaComment } from "react-icons/fa";

type CommentProps = {
  postId: string;
};

const CommentBox: React.FC<CommentProps> = ({ postId }) => {
  const [commentText, setCommentText] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  console.log(postId);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-black p-2">
          <FaComment className="text-white" />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black">
        <DialogHeader>
          <DialogTitle>Post your reply</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10  text-white flex items-center justify-center rounded-full">
            S
          </div>
          <div className="flex-1">
            <Input
              placeholder="Post your reply"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="text-gray-300 placeholder-gray-500"
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
          <Button
            onClick={handleSubmit}
            disabled={commentText.trim() === ""}
            className={`${
              commentText.trim() === ""
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            Reply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentBox;
