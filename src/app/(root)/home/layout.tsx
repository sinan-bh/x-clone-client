import Sidebar from "@/components/side-bar/side-bar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between max-w-60 items-end pr-5 border-r border-gray-600 h-screen py-5 text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
