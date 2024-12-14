// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for the user
interface User {
  createdAt: string;
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  bgImage: string;
  updatedAt: string;
  userName: string;
  followers: [];
  following: [];
  bio?: string;
  location?: string;
  web?: string;
  tweets: string[];
}

interface UserState {
  userDetails: User | null;
  isOwnProfile: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  userDetails: null,
  isOwnProfile: false,
  status: "idle",
};

// Create an async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (profileId: string) => {
    const response = await axios.get(
      `http://localhost:3001/api/user/${profileId}`
    );

    console.log(response);

    return response.data?.data;
  }
);

// Create an async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { profileId, name, bio, location, web, profilePicture, bgImage }: any,
    { rejectWithValue }
  ) => {
    try {
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

      const response = await axios.put(
        `http://localhost:3001/api/user/${profileId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // return the updated user data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Error updating profile");
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsOwnProfile: (state, action) => {
      state.isOwnProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetails = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetails = action.payload; // Update user details with the response
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setIsOwnProfile } = userSlice.actions;

export default userSlice.reducer;
