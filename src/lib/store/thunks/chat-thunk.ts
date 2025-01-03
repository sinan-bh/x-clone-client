import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

export const fetchParticipants = createAsyncThunk(
  "chat/fetchParticipants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chats/participants");
      return response.data.data.participants;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chats/messages/${chatId}`);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Search users
export const fetchSearchUsers = createAsyncThunk(
  "user/fetchSearchUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/search?query=${query}`);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create or fetch a chat
// export const fetchChat = createAsyncThunk(
//   "chat/fetchChat",
//   async (
//     { user1, user2 }: { user1: string; user2: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.get(`/chats/${user1}/${user2}`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createChat = createAsyncThunk(
//   "chat/createChat",
//   async (
//     { user1, user2 }: { user1: string; user2: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.post("/chats/create", {
//         user1,
//         user2,
//       });
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
