"use client";

import { verifyOtp } from "@/lib/store/features/auth-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 5 && value.length < 7) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    setOtp(value);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registration") || "");
    setEmail(data.email);
  }, []);

  const handleClick = async () => {
    if (otp.length > 5 && otp.length < 7 && email) {
      await dispatch(verifyOtp({ otp: otp, email: email })).unwrap();
      router.push("/verify-username");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800 px-4 sm:px-8">
      <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl bg-black rounded-lg shadow-lg flex flex-col p-5 sm:p-8">
        <div className="flex items-center">
          <div className="flex justify-center w-full">
            <Image
              src={"/images/twitter-logo.png"}
              width={60}
              height={60}
              alt="Twitter Logo"
              className="sm:w-20 sm:h-20"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col justify-between h-[300px] sm:h-[400px]">
          <div className="w-full">
            <div className="w-full sm:w-4/5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                We sent you a code
              </h2>
              <div className="text-sm sm:text-base text-gray-500">
                Enter it below to verify <span>{email || "abc@gmail.com"}</span>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-center mb-4">
                Invalid or expired code
              </p>
            )}
            <div className="mb-4">
              <input
                type="text"
                id="otp"
                name="otp"
                className="w-full h-12 sm:h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                placeholder="Enter code"
                value={otp}
                onChange={handleChange}
              />
            </div>
            <div className="text-blue-500 hover:underline cursor-pointer text-sm sm:text-base">
              Didn&apos;t receive an email?
            </div>
          </div>
          <div
            className={`w-full border rounded-3xl border-none py-3 flex justify-center text-sm sm:text-base cursor-pointer ${
              isActive ? "bg-white text-black" : "bg-gray-600"
            }`}
            onClick={handleClick}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
