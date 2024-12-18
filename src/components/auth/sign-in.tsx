"use client";

import { loginUser } from "@/lib/store/features/auth-slice";
import { useAppDispatch } from "@/lib/store/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type Users = {
  userName: string;
  email: string;
  password: string;
}[];

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userLogin, setUserLogin] = useState<string>("");
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
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="w-full max-w-md bg-black p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-start text-white mb-6">
          Sign in to X
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userLogin"
              className="block text-gray-500 font-medium"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="userLogin"
              className="w-full p-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your username or email"
              value={userLogin}
              onChange={(e) => {
                setUserLogin(e.target.value);
                setError(null);
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-500 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
