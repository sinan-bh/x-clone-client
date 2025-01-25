"use client";

import { authLogin } from "@/lib/store/thunks/auth-thunk";
import { useAppDispatch } from "@/lib/store/hook";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export const handleGoogleAuth = async () => {
  await signIn("google");
};

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center h-1/2 md:h-screen sm:p-4 md:ml-10">
        <Image
          src={"/images/twitter-logo.png"}
          height={900}
          width={1000}
          alt={"Twitter Logo"}
          className="border-none max-w-full h-auto w-60 sm:w-full"
        />
      </div>

      <div className="flex flex-col justify-evenly p-4 md:w-1/2">
        <div className="text-4xl md:text-6xl text-pretty font-extrabold mt-8 md:mt-16">
          Happening Now
        </div>

        <div className="flex flex-col mt-8 md:mt-10 w-full md:w-2/3 h-auto">
          <div className="text-2xl md:text-4xl font-bold">Join Today.</div>
          <div className="mt-6 md:mt-10">
            <div
              className="cursor-pointer bg-white border rounded-full py-2 text-black flex justify-center items-center"
              onClick={handleGoogleAuth}
            >
              <FcGoogle size={25} />
              <span className="pl-2">Sign Up with Google</span>
            </div>
            <div className="cursor-pointer bg-white border rounded-full py-2 text-black flex justify-center items-center font-semibold my-2">
              <AiFillApple size={25} />
              <span className="pl-2">Sign Up with Apple</span>
            </div>
          </div>

          <div className="flex items-center justify-center my-4">
            <div className="border-b border-gray-600 w-full"></div>
            <span className="px-2">or</span>
            <div className="border-b border-gray-600 w-full"></div>
          </div>

          <Link
            href={"/signup"}
            className="cursor-pointer py-2 bg-blue-500 mt-2 rounded-full flex justify-center items-center font-bold hover:bg-blue-600"
          >
            Create account
          </Link>
          <div className="text-xs md:text-[12px] mt-1 text-center md:text-left">
            By signing up, you agree to the{" "}
            <span className="hover:underline text-blue-500">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-500 hover:underline">
              Privacy Policy
            </span>
            , including{" "}
            <span className="text-blue-500 hover:underline">Cookie Use</span>.
          </div>
        </div>

        <div className="w-full md:w-2/3 mt-4 md:mt-0">
          <div className="font-bold text-lg md:text-xl">
            Already have an account?
          </div>
          <Link
            href={"/signin"}
            className="cursor-pointer border rounded-full py-2 flex justify-center text-blue-500 font-bold mt-3 hover:bg-gray-900"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
