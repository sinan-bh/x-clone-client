"use client";

import { registerUser } from "@/lib/store/features/auth-slice";
import { useAppDispatch } from "@/lib/store/hook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email } = formData;

    if (!name || !email) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);

    try {
      await dispatch(registerUser(formData)).unwrap();
      alert("otp send your email");
      router.push("/verify-otp");
    } catch (err) {
      setError(err as string);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
      <div className="w-2/4 px-32  bg-black p-8 rounded-lg shadow-lg flex flex-col justify-center">
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
        {!isCreate ? (
          <div className="flex flex-col items-center mt-10">
            <div className="w-1/2 flex ">
              <h2 className="text-3xl font-semibold text-white mb-6">
                Join X today
              </h2>
            </div>
            <div className="w-2/4">
              <div className="cursor-pointer bg-white border rounded-full py-3 text-black flex justify-center items-center my-4">
                <FcGoogle size={25} />
                <span className="pl-2">Sign Up with Google</span>
              </div>
              <div className="cursor-pointer bg-white border rounded-full py-3 text-black flex justify-center items-center font-semibold my-4">
                <AiFillApple size={25} />
                <span className="pl-2">Sign Up with Apple</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-2/4">
              <div className=" border-b border-gray-600 w-full"></div>
              <span className="px-2">or</span>
              <div className=" border-b w-full border-gray-600"></div>
            </div>
            <div
              className="h-12 cursor-pointer w-1/2 text-black bg-white hover:bg-gray-200 flex justify-center items-center border rounded-full my-4"
              onClick={() => setIsCreate(true)}
            >
              Created account
            </div>
            <div className="text-[12px] w-1/2">
              By signing up, you agree to the{" "}
              <span className="hover:underline text-blue-500">
                Terms of Service
              </span>{" "}
              and
              <span className="text-blue-500 hover:underline">
                Privacy Policy
              </span>{" "}
              , including{" "}
              <span className="text-blue-500 hover:underline">Cookie Use</span>.
            </div>
          </div>
        ) : (
          <div className="mt-5">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="w-4/5 flex">
              <h2 className="text-3xl font-semibold text-white mb-6">
                Create your account
              </h2>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full h-16 px-3 mt-5 text-white border border-gray-600 rounded-md bg-transparent"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div
              className="w-full flex justify-center bg-gray-500 font-extrabold text-black  py-3 bg-blue-600 cursor-pointer rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Next
            </div>
          </div>
        )}

        <p className="w-3/5 flex justify-end mt-4 text-gray-600">
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
