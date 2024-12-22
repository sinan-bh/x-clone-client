import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



const Instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Fetch All users
  export const fetchAllUsers = createAsyncThunk(
    "user/fetchAllUsers",
    async () => {
      const response = await Instance.get(`/user`);
      return response.data?.data;
    }
  );
  
  // Fetch user data
  export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (userName: string) => {
      const response = await Instance.get(`/user/${userName}`);
      return response.data?.data;
    }
  );
  
  // Update user profile
  export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { userName, name, bio, location, web, profilePicture, bgImage }: any,
      { rejectWithValue }
    ) => {
      try {
        const currentUser = Cookies.get("user");
        const user = JSON.parse(currentUser || "{}");
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);
        formData.append("location", location);
        formData.append("web", web);
  
        if (profilePicture) {
          formData.append("profilePicture", profilePicture);
        }
  
        if (bgImage) {
          formData.append("bgImage", bgImage);
        }
  
        const response = await axiosInstance.put(`/user/${userName}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        });
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchFollowersOrFollowing = createAsyncThunk(
    "user/fetchFollowersOrFollowing",
    async ({
      userName,
      followStatus,
    }: {
      userName: string;
      followStatus: string;
    }) => {
      const response = await Instance.get(
        `/user/${userName}?status=${followStatus}`
      );
  
      return {
        data:
          followStatus === "followers"
            ? response.data.data.followers
            : response.data.data.following,
      };
    }
  );
  
  export const toggleFollow = createAsyncThunk(
    "user/toggleFollow",
    async ({
      userId: id,
      followedUserId,
    }: {
      userId: string;
      followedUserId: string;
    }) => {
      const response = await axiosInstance.post(`/user/${id}`, {
        userId: followedUserId,
      });
  
      return response.data?.data;
    }
  );
  