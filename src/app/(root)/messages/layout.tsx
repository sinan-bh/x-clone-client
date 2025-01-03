import ChatList from "@/components/chat/chat-list";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen text-white">
      <div className="w-2/6">
        <ChatList />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
