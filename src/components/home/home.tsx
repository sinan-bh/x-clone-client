"use client";

import React, { useEffect } from "react";
import NavBar from "@/components/home/navbar/navbar";
import SearchSection from "@/components/home/search-section/search-section";
import TweetList from "@/components/home/tweets/tweet-list";
import PostInput from "./tweets/create-tweet";
import { socket } from "../chat/chat-list";
import { setAddNotificaiton } from "@/lib/store/features/notification-slice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/store/hook";
import { NotificationData } from "@/utils/types/types";


export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");

    socket.on(
          "receiveNotification",
          ({
            createdNotification,
            userId,
          }: {
            createdNotification: NotificationData;
            userId: string;
          }) => {
            if (userId === user.id) {
              dispatch(setAddNotificaiton(createdNotification));
              toast.info(
                `${createdNotification?.sender?.name} ${createdNotification?.message}`
              );
            }
          }
        );
  },[dispatch])

  return (
    <div className="w-screen h-screen flex">
      <div className="  sm:w-1/2 border-r border-gray-600 sticky">
        <div className="">
          <NavBar />
        </div>
        <div className="hide-scrollbar overflow-y-scroll w-full sm:w-full max-h-[91vh]">
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
