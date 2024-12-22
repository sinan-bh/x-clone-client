import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { name: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await Instance.post(`/auth/register`, userData);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (userData: { otp: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await Instance.post(`/auth/verify-otp`, userData);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const finalSubmission = createAsyncThunk(
  "auth/finalSubmission",
  async (
    userData: {
      name: string;
      email: string;
      profilePicture: string;
      userName: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post(`/auth/final-submission`, userData);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { loginField: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Instance.post(`/auth/login`, credentials);
      const { data } = response;
      const userData = data.data;

      Cookies.set(
        "user",
        JSON.stringify({
          userName: userData.user.userName,
          name: userData.user.name,
          profilePicture: userData.user.profilePicture,
          email: userData.user.email,
          token: userData.token,
          id: userData.user.id,
        }),
        { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//Auth Login
export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await Instance.post(`/auth/google-auth`, { email });
      const { data } = response;
      const userData = data.data;

      Cookies.set(
        "user",
        JSON.stringify({
          userName: userData.user.userName,
          name: userData.user.name,
          profilePicture: userData.user.profilePicture,
          email: userData.user.email,
          token: userData.token,
          id: userData.user.id,
        }),
        { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
