import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";


export const createComment = createAsyncThunk(
    "tweets/createComment",
    async (
      { postId, text }: { postId: string; text: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosInstance.post(`/comments/create/${postId}`, {
          text,
        });
        return response.data.data;
  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch tweets"
        );
      }
    }
  );
  
  export const fetchComments = createAsyncThunk(
    "tweets/fetchComments",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/comments`);
  
        return response.data.data;
  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch tweets"
        );
      }
    }
  );