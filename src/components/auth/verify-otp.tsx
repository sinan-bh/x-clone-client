"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOtp(value);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
      <div className="max-w-full px-28  bg-black rounded-lg shadow-lg flex flex-col p-8">
        <div className="flex items-center">
          <div className="flex justify-center w-full">
            <Image
              src={"/images/twitter-logo.png"}
              width={80}
              height={80}
              alt=""
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-between h-[400px]">
          <div className="w-full">
            <div className="w-4/5">
              <h2 className="text-3xl font-semibold text-white text-nowrap">
                We send you a code
              </h2>
              <div className="text-sm text-gray-500 text-nowrap">
                Enter it below to verify <span>{"abc@gmail.com"}</span>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="otp"
                name="value"
                className="w-full h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                placeholder="Enter code"
                value={otp}
                onChange={handleChange}
              />
            </div>
            <div className="text-blue-500 hover:underline cursor-pointer">
              Did&apos;t recieve an email?
            </div>
          </div>
          <div className="w-full border rounded-3xl bg-gray-600 border-none py-3 flex justify-center">
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
