"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function VerifyUserName() {
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 3) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    setPassword(value);
  };

  const handleNext = () => {
    if (password.length > 3) {
      setIsNext(true);
    }
  };

  const handleSubmit = () => {
    alert("login successfully");
    router.push("/home");
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
        {!isNext ? (
          <div className="mt-5 flex flex-col justify-between h-[400px]">
            <div className="w-full">
              <div className="w-4/5">
                <h2 className="text-3xl font-semibold text-white text-nowrap">
                  Enter Your Password
                </h2>
                <div className="text-sm text-gray-500 text-nowrap">
                  Enter minimum 4 characters
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="value"
                  className="w-full h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div
              className={`w-full border rounded-3xl  border-none py-3 flex justify-center ${
                isActive ? "bg-white text-black" : "bg-gray-600"
              }`}
              onClick={handleNext}
            >
              Next
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-col justify-between h-[400px]">
            <div className="w-full">
              <div className="w-4/5">
                <h2 className="text-3xl font-semibold text-white text-nowrap">
                  Enter Your User Name
                </h2>
                {/* <div className="text-sm text-gray-500 text-nowrap">
                  Enter minimum 4 characters
                </div> */}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="userName"
                  name="value"
                  className="w-full h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div
              className="w-full border rounded-3xl bg-gray-600 border-none py-3 flex justify-center"
              onClick={handleSubmit}
            >
              Next
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
