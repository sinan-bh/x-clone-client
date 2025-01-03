"use client";

import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Picker, { Theme } from "emoji-picker-react";
import Cookies from "js-cookie";
import { LoginedUser } from "../home/tweets/tweet";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { fetchUserData } from "@/lib/store/thunks/user-thunk";
import { addMessage, setMessages } from "@/lib/store/features/chat-slice";
import Image from "next/image";
import { socket } from "./chat-list";
import { CircularProgress } from "@mui/material";

export interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

const Inbox: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  const { userDetails } = useAppSelector((state) => state.user);
  const { messages, loading } = useAppSelector((state) => state.chat);
  const [loginedUser, setLoginedUser] = useState<LoginedUser | null>(null);
  const { chatId, userId }: { chatId: string; userId: string } = useParams();
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatId && userId) {
      router.refresh();
      console.log(chatId);
      dispatch(fetchUserData(userId));

      socket.emit("joinRoom", { chatId });

      socket.on("previousMessages", (msgs: Message[]) => {
        dispatch(setMessages(msgs));
        scrollToBottom();
      });

      socket.on("receiveMessage", (message: Message) => {
        dispatch(addMessage(message));
        scrollToBottom();
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("previousMessages");
      };
    }
  }, [chatId, dispatch, router, userId]);

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    setLoginedUser(user);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });

  const initValues = {
    message: "",
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      if (!loginedUser) return;
      const messageData = {
        chatId,
        sender: loginedUser?.id,
        content: values.message,
      };
      console.log(messageData);
      socket.emit("sendMessage", messageData);
      formik.resetForm();
    },
  });

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    formik.setFieldValue("message", formik.values.message + emojiObject.emoji);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen z-40">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen border-l border-gray-600">
      <div className="border-b border-gray-600 h-20 p-4">
        <div>
          <div className="flex gap-4">
            <div>
              {userDetails?.profilePicture && (
                <Image
                  src={userDetails?.profilePicture}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
            </div>
            <div>
              <div className="font-bold text-xl">
                {userDetails?.name ? userDetails.name : "Messages"}
              </div>
              <Link
                href={`/${userDetails?.userName}`}
                className="text-gray-500 cursor-pointer hover:underline"
              >
                {userDetails?.userName ? "@" + userDetails.userName : ""}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {!chatId ? (
        <div className="flex-1 overflow-y-auto p-4"></div>
      ) : (
        <div className="flex-1 hide-scrollbar overflow-y-auto p-4">
          {messages?.map((msg) => (
            <div key={msg.timestamp} className="flex gap-2">
              {msg.sender !== loginedUser?.id && (
                <div>
                  {userDetails?.profilePicture && (
                    <Image
                      src={userDetails?.profilePicture}
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </div>
              )}
              <div
                className={`p-2 max-w-[500px] ${
                  msg.sender === loginedUser?.id
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-800 text-white"
                } rounded-md mb-2 w-fit`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="p-4 border-t border-gray-600">
        <form onSubmit={formik.handleSubmit} className="flex items-center">
          <input
            type="text"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            placeholder="Type a message..."
            className="flex-grow p-2 rounded-md bg-gray-900 text-white"
          />
          <div className="relative">
            <div
              onClick={() => setShowPicker(!showPicker)}
              className="p-2 ml-2 bg-gray-800 rounded-md cursor-pointer"
              ref={emojiPickerRef}
            >
              😊
            </div>
            {showPicker && (
              <div className="absolute bottom-11 right-1 z-50">
                <Picker onEmojiClick={onEmojiClick} theme={Theme.DARK} />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="p-2 ml-2 bg-blue-500 rounded-md text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inbox;
