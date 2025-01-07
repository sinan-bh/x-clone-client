import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchNotification = createAsyncThunk(
    "user/fetchNotification",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/notification`);
        return response.data.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const readedNotification = createAsyncThunk(
    "user/readedNotification",
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post(`/notification/${id}`);
        return response.data.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );