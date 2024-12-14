"use client";

import { registerUser } from "@/lib/store/features/auth-slice";
import { useAppDispatch } from "@/lib/store/hook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    profilePicture: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, userName, password } = formData;

    if (!name || !email || !userName || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);

    try {
      await dispatch(registerUser(formData)).unwrap();
      alert("Sign Up Completed");
      router.push("/signin");
    } catch (err) {
      setError(err as string);
    }
  };

  console.log(error);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="w-full max-w-lg bg-black p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-start text-white mb-6">
          Sign up to X
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-500 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-500 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-500 font-medium"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your user name"
              value={formData.userName}
              onChange={handleChange}
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
              name="password"
              className="w-full p-3 mt-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
