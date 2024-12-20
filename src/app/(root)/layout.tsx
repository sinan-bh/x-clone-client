import Sidebar from "@/components/side-bar/side-bar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen text-white">
      <div className=" sm:w-1/6 z-50">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
