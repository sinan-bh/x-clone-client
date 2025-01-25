"use client";

import { finalSubmission } from "@/lib/store/thunks/auth-thunk";
import { useAppDispatch } from "@/lib/store/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function VerifyUserName() {
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 3) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    setPassword(value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUserName(value);
    if (value.length > 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
      return;
    }
  };

  const handleNext = () => {
    if (password.length > 3) {
      setIsNext(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("registration") || "");
      await dispatch(
        finalSubmission({
          name: data.name,
          email: data.email,
          profilePicture: data.image,
          userName: userName,
          password: password,
        })
      ).unwrap();
      toast.success("Sign In Successful");
      localStorage.setItem("loginedUser", JSON.stringify(true));
      localStorage.setItem("status", JSON.stringify("forYou"));
      router.push("/signin");
    } catch (err) {
      setError((err as string) && "User name already existing");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800 px-4 sm:px-8 md:px-16 lg:px-28">
      <div className="max-w-full w-full sm:w-4/5 md:w-3/4 lg:w-2/5 bg-black rounded-lg shadow-lg flex flex-col p-6 sm:p-8">
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
              <div className="w-full sm:w-4/5">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                  Enter Your Password
                </h2>
                <div className="text-sm text-gray-500">
                  Enter minimum 4 characters
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="value"
                  className="w-full h-12 sm:h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                  placeholder="Enter password"
                  value={password}
                  onChange={handleChangePassword}
                />
              </div>
            </div>
            <div
              className={`w-full border rounded-3xl py-3 flex justify-center cursor-pointer ${
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
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <div className="w-full sm:w-4/5">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                  Enter Your User Name
                </h2>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="userName"
                  name="value"
                  className="w-full h-12 sm:h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                  placeholder="Enter username"
                  value={userName}
                  onChange={handleChangeUserName}
                />
              </div>
            </div>
            <div
              className={`w-full border rounded-3xl py-3 flex justify-center cursor-pointer ${
                isActive ? "bg-white text-black" : "bg-gray-600"
              }`}
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
