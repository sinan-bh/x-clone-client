"use client";

import React, { useEffect } from "react";
import SearchSection from "../home/search-section/search-section";
import Image from "next/image";
import { socket } from "../chat/chat-list";
import Cookies from "js-cookie";
import { getTimeAgo } from "../home/tweets/tweet";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { toast } from "react-toastify";
import {
  NotificationData,
  setAddNotificaiton,
  setNotification,
} from "@/lib/store/features/notification-slice";
import { readedNotification } from "@/lib/store/thunks/notification-thunk";

export default function Notification() {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notification);
  const router = useRouter();

  useEffect(() => {
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");

    socket.emit("joinNotification", { userId: user.id });

    socket.on(
      "previouseNotification",
      ({
        notification,
        userId,
      }: {
        notification: NotificationData[];
        userId: string;
      }) => {
        if (userId === user.id) {
          dispatch(setNotification(notification));
        }
      }
    );

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
  }, [dispatch]);

  const handleClick = (postId: string, id: string) => {
    dispatch(readedNotification(id));
    const currentUser = Cookies.get("user");
    const user = JSON.parse(currentUser || "{}");
    router.push(`${user.userName}/status/${postId}`);
  };

  return (
    <div className="bg-black flex flex-col md:flex-row">
      <div className="w-full md:w-[83vw]">
        <div className="text-white text-2xl font-bold h-28 flex p-4 border-gray-600 border-b">
          Notifications
        </div>
        {!notifications || notifications.length < 1 ? (
          <div className="flex min-h-screen flex-col items-center p-4 hide-scrollbar">
            <div className="text-3xl font-extrabold text-center">
              Nothing to see here —
              <br /> yet
            </div>
            <div className="text-lg pt-4 text-gray-500 text-center">
              From likes to reposts and a whole lot more, this
              <br /> is where all the action happens.
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto hide-scrollbar max-h-[90vh]">
            {notifications?.map((notification, i) => (
              <div
                className={`flex justify-around items-center border-b border-gray-600 h-16 cursor-pointer hover:bg-slate-950 ${
                  !notification.isRead ? "text-white" : "text-gray-400"
                }`}
                key={i}
                onClick={() =>
                  handleClick(notification?.reference, notification._id)
                }
              >
                {notification?.sender?.profilePicture && (
                  <div>
                    <Image
                      src={`${notification?.sender?.profilePicture}`}
                      alt=""
                      height={40}
                      width={40}
                      className="rounded-full"
                    />
                  </div>
                )}
                <div className="text-center">
                  {notification?.sender?.name} {notification?.message}
                </div>
                <div>
                  {notification?.createdAt &&
                    getTimeAgo(notification?.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="hidden md:block md:w-1/2">
        <SearchSection />
      </div>
    </div>
  );
}
