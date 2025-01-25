"use client";

import { authLogin, registerUser } from "@/lib/store/thunks/auth-thunk";
import { useAppDispatch } from "@/lib/store/hook";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { handleGoogleAuth } from "./home";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

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
      localStorage.setItem(
        "registration",
        JSON.stringify({ name: formData.name, email: formData.email })
      );
      toast.info("OTP sent to your email");
      router.push("/verify-otp");
    } catch (err) {
      setError((err as string) && "Email already existing");
    }
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      const userEmail = session.user.email;

      const fetchData = async (userEmail: string) => {
        const res = await dispatch(authLogin(userEmail as string)).unwrap();
        if (res.message === "Login successful") {
          localStorage.setItem("loginedUser", JSON.stringify(true));
          localStorage.setItem("status", JSON.stringify("forYou"));
          router.push("/home");
        } else if (res.message === "User not found") {
          localStorage.setItem(
            "registration",
            JSON.stringify({
              name: session?.user?.name,
              email: session?.user?.email,
              image: session?.user?.image,
            })
          );
          router.push("/verify-username");
        }
      };

      fetchData(userEmail as string);
    }
  }, [session?.user, dispatch, router]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800 p-4">
      <div className="max-w-md md:max-w-lg lg:max-w-2xl px-6 py-8 bg-black rounded-lg shadow-lg flex flex-col justify-center">
        <div className="flex items-center justify-center mb-6">
          <Image src="/images/twitter-logo.png" width={80} height={80} alt="" />
        </div>
        {!isCreate ? (
          <div className="flex flex-col ">
            <h2 className="text-3xl font-semibold text-white mb-6">
              Join X today
            </h2>
            <div className="max-w-full flex flex-col gap-4">
              <button
                className="bg-white border rounded-3xl px-3 py-3 text-black flex justify-center items-center"
                onClick={handleGoogleAuth}
              >
                <FcGoogle size={25} />
                <span className="pl-2">Sign Up with Google</span>
              </button>
              <button className="bg-white border rounded-3xl px-3 py-3 text-black flex justify-center items-center font-semibold">
                <AiFillApple size={25} />
                <span className="pl-2">Sign Up with Apple</span>
              </button>
            </div>
            <div className="flex items-center justify-center w-full my-6">
              <div className="border-b border-gray-600 flex-grow"></div>
              <span className="px-2">or</span>
              <div className="border-b border-gray-600 flex-grow"></div>
            </div>
            <button
              className="h-12  w-full bg-white hover:bg-gray-200 text-black font-bold flex justify-center items-center border rounded-3xl"
              onClick={() => setIsCreate(true)}
            >
              Create account
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              By signing up, you agree to the
              <span className="text-blue-500 hover:underline">
                {" "}
                Terms of Service
              </span>
              ,
              <span className="text-blue-500 hover:underline">
                {" "}
                Privacy Policy
              </span>
              , and
              <span className="text-blue-500 hover:underline"> Cookie Use</span>
              .
            </p>
          </div>
        ) : (
          <div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <h2 className="text-3xl font-semibold text-white mb-6">
              Create your account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full h-12 px-3 text-white border border-gray-600 rounded-md bg-transparent"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                id="email"
                name="email"
                className="w-full h-12 px-3 text-white border border-gray-600 rounded-md bg-transparent"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-gray-500 hover:bg-gray-700 text-black font-bold py-3 rounded-3xl"
              >
                Next
              </button>
            </form>
          </div>
        )}
        <p className="text-sm text-gray-600 text-center mt-6">
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
