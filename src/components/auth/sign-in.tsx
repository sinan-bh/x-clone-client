"use client";

import { loginUser } from "@/lib/store/features/auth-slice";
import { useAppDispatch } from "@/lib/store/hook";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export type Users = {
  userName: string;
  email: string;
  password: string;
}[];

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userLogin, setUserLogin] = useState<string>("");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (!userLogin || !password) {
      setError("Please enter both username/email and password.");
      return;
    }

    try {
      await dispatch(loginUser({ loginField: userLogin, password })).unwrap();
      localStorage.setItem("loginedUser", JSON.stringify(true));
      router.push(`/home`);
      alert("Sign In Successful");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err && "Invalid username/email or password.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
      <div className="w-3/5 h-5/6 flex flex-col  bg-black  rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="ml-8">x</div>
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
          <div className="w-full flex flex-col items-center mt-16">
            <div className="w-4/5 flex pl-32 mb-6">
              <h2 className="text-3xl font-semibold text-white  ">
                Sign in to X
              </h2>
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="w-2/4">
                <div className="cursor-pointer bg-white border rounded-full py-2 text-black flex justify-center items-center">
                  <FcGoogle size={25} />
                  <span className="pl-2">Sign Up with Google</span>
                </div>
                <div className="cursor-pointer bg-white border rounded-full py-2 text-black flex justify-center items-center font-semibold my-3">
                  <AiFillApple size={25} />
                  <span className="pl-2">Sign Up with Apple</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-2/4">
                <div className=" border-b border-gray-600 w-full"></div>
                <span className="px-2">or</span>
                <div className=" border-b w-full border-gray-600"></div>
              </div>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <div className="w-2/4 ">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="userLogin"
                      className="w-full bg-transparent text-white p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter your username or email"
                      value={userLogin}
                      onChange={(e) => {
                        setUserLogin(e.target.value);
                        setError(null);
                      }}
                    />
                  </div>
                  <div
                    className="w-full flex justify-center py-2 bg-white text-black rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsNext(true)}
                  >
                    Next
                  </div>
                  <div className="w-full border border-gray-600 flex justify-center py-2 cursor-pointer rounded-full mt-4 hover:bg-gray-900">
                    forgot password
                  </div>
                </form>
              </div>
            </div>
            <p className="text-center mt-4 text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-between mt-12">
            <div className="w-1/2  text-white">
              <h2 className="text-2xl font-bold ">Enter your password</h2>
              <div className="border bg-gray-900 border-none h-16 rounded-sm mt-7 px-2">
                <div className="text-gray-400 mt-2">Username</div>
                <div className="text-gray-400 mt-2">{userLogin}</div>
              </div>
            </div>
            <div className="w-2/4 flex flex-col justify-evenly h-2/3">
              <div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="password"
                    className="w-full h-16 bg-transparent p-3 mt-2 border text-white border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full flex justify-between text-blue-500 text-sm">
                  <Link href="/forgot-password" className="hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div>
                <div className="mt-6">
                  <div
                    className="w-full flex justify-center py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700"
                    onClick={handleSubmit}
                  >
                    Log in
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
