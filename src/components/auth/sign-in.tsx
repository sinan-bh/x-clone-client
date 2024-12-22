"use client";

import { authLogin, loginUser } from "@/lib/store/thunks/auth-thunk";
import { fetchAllUsers } from "@/lib/store/thunks/user-thunk";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleAuth } from "./home";
import { toast } from "react-toastify";

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
  const [isActive, setIsActive] = useState<boolean>(false);
  const { data: session } = useSession();

  const { users } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchAllUsers()).unwrap();
    }
  }, [session?.user, dispatch]);

  useEffect(() => {
    if (session?.user) {
      const userEmail = session.user.email;
      const isExisting = users?.some((user) => user.email === userEmail);
      if (isExisting) {
        dispatch(authLogin(userEmail as string)).unwrap();
        toast.success("Sign In Successful")
        router.push("/home");
      } else {
        localStorage.setItem(
          "registration",
          JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          })
        );
        router.push("/verify-username");
      }
    }
  }, [session?.user, users, dispatch, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    setUserLogin(value);
    setError(null);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 3) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    setPassword(value);
  };

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
      toast.success("Sign In Successful");
      router.push(`/home`);
    } catch (err) {
      setError((err as string) && "Invalid username/email or password.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800 px-4 md:px-8">
      <div className="w-full max-w-lg md:w-3/5 h-5/6 flex flex-col bg-black rounded-lg shadow-lg">
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
          <div className="w-full flex flex-col items-center mt-8 md:mt-16">
            <div className="w-4/5 flex pl-0 md:pl-32 mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Sign in to X
              </h2>
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-xs md:w-2/4">
                <div className="cursor-pointer bg-white border rounded-3xl text-nowrap py-2 text-black flex justify-center items-center" onClick={handleGoogleAuth}>
                  <FcGoogle size={25} />
                  <span className="pl-2">Sign Up with Google</span>
                </div>
                <div className="cursor-pointer bg-white border rounded-3xl text-nowrap py-2 text-black flex justify-center items-center font-semibold my-3">
                  <AiFillApple size={25} />
                  <span className="pl-2">Sign Up with Apple</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-full max-w-xs md:w-2/4">
                <div className="border-b border-gray-600 w-full"></div>
                <span className="px-2">or</span>
                <div className="border-b w-full border-gray-600"></div>
              </div>

              <div className="w-full max-w-xs md:w-2/4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="userLogin"
                      className="w-full h-12 md:h-16 bg-transparent text-white p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                      placeholder="Enter your username or email"
                      value={userLogin}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`w-full cursor-pointer flex justify-center py-2 rounded-3xl text-nowrap ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-gray-600 text-white"
                    }`}
                    onClick={() => setIsNext(true)}
                  >
                    Next
                  </div>
                  <div className="w-full border border-gray-600 flex justify-center py-2 cursor-pointer rounded-3xl text-nowrap mt-4 hover:bg-gray-900">
                    forgot password
                  </div>
                </form>
              </div>
            </div>
            <div>
              <div className="mt-4 text-gray-500 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-between mt-12">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="w-4/5 md:w-1/2 text-white">
              <h2 className="text-lg md:text-2xl font-bold">
                Enter your password
              </h2>
              <div className="border bg-gray-900 border-none h-12 md:h-16 rounded-sm mt-4 md:mt-7 px-2">
                <div className="text-gray-400 mt-2">Username</div>
                <div className="text-gray-400 mt-2">{userLogin}</div>
              </div>
            </div>
            <div className="w-4/5 md:w-2/4 flex flex-col justify-evenly h-2/3">
              <div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="password"
                    className="w-full h-12 md:h-16 bg-transparent p-3 mt-2 border text-white border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                </div>
                <div className="w-full flex justify-between text-blue-500 text-sm">
                  <Link href="/forgot-password" className="hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div>
                <div
                  className={`w-full cursor-pointer flex justify-center py-3 bg-gray-600 rounded-3xl text-nowrap font-bold ${
                    isActive ? "bg-white text-black" : "bg-gray-600 text-white"
                  }`}
                  onClick={handleSubmit}
                >
                  Log in
                </div>
                <div>
                  <p className="mt-4 text-gray-500 text-center">
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
