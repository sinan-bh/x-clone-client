import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import { TweetData } from "../features/tweets-slice";

// create Tweet
export const createTweet = createAsyncThunk(
  "tweets/creatTweet",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/tweets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create tweet"
      );
    }
  }
);

// Fetch Tweets
export const fetchTweets = createAsyncThunk<TweetData[]>(
  "tweets/fetchTweets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/tweets");
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);

// Fetch User Tweets
export const fetchUserTweet = createAsyncThunk<TweetData[], string>(
  "tweets/fetchUserTweet",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/tweets/${userId}`);
      return response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);

export const likedPost = createAsyncThunk(
  "tweets/likedPost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/tweets/${postId}`);
      console.log(response.data.data);

      return response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);

export const savedPost = createAsyncThunk(
  "tweets/savedPost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/tweets/saved/${postId}`);
      console.log(response.data.data);

      return response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);

export const fetchFollowingUserPost = createAsyncThunk(
  "tweets/fetchfollowingUserPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/tweets/following`);
      return response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);
