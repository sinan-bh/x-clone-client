"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type Users =
  | [
      {
        userName: string;
        email: string;
        password: string;
      }
    ]
  | undefined;

const SignIn = () => {
  const router = useRouter();
  const [loginUser, setLoginUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (!loginUser || !password) {
      setError("Please enter both username/email and password.");
      return;
    }

    try {
      const storedUser = localStorage.getItem("x-users");

      if (!storedUser) {
        setError("No user found. Please register first.");
        return;
      }

      const users: Users = JSON.parse(storedUser);

      const user = users?.find(
        (u) =>
          (u.userName === loginUser || u.email === loginUser) &&
          u.password === password
      );

      if (
        (loginUser === user?.userName || loginUser === user?.email) &&
        password === user?.password
      ) {
        alert("Sign In Successful");
        localStorage.setItem("loginedUser", JSON.stringify(user));
        router.push(`/home`);
      } else {
        setError("Invalid username/email or password.");
      }
    } catch (err) {
      console.error("Error reading user data from localStorage:", err);
      setError("An unexpected error occurred. Please try again.");
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
              htmlFor="loginUser"
              className="block text-gray-500 font-medium"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="loginUser"
              className="w-full p-3 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your username or email"
              value={loginUser}
              onChange={(e) => {
                setLoginUser(e.target.value);
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
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
