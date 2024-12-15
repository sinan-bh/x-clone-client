import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type FollowUser = {
  _id?: string;
  name?: string | undefined;
  profilePicture?: string;
  userName?: string;
  bio?: string;
  followers?: [];
  following?: [];
};

interface User {
  _id: string;
  createdAt: string;
  email: string;
  name: string;
  password: string;
  profilePicture: string;
  bgImage: string;
  updatedAt: string;
  userName: string;
  followers: FollowUser[];
  following: FollowUser[];
  bio?: string;
  location?: string;
  web?: string;
  tweets: string[];
}

interface UserState {
  userDetails: User | null;
  isOwnProfile: boolean;
  followStatus: "follow" | "following";
  status: "idle" | "loading" | "failed";
  followUsers: FollowUser[] | null;
}

const initialState: UserState = {
  userDetails: null,
  isOwnProfile: false,
  followStatus: "follow",
  status: "idle",
  followUsers: [],
};

// Fetch user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (profileId: string) => {
    const response = await axios.get(
      `http://localhost:3001/api/user/${profileId}`
    );
    return response.data?.data;
  }
);

// Update user profile
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
    const response = await axios.get(
      `http://localhost:3001/api/user/${userName}?status=${followStatus}`
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
    const response = await axios.post(`http://localhost:3001/api/user/${id}`, {
      userId: followedUserId,
    });

    return response.data?.data;
  }
);

export const unfollow = createAsyncThunk(
  "user/unfollow",
  async ({
    userId,
    followedUserId,
  }: {
    userId: string;
    followedUserId: string;
  }) => {
    const response = await axios.delete(
      `http://localhost:3001/api/user/${userId}/${followedUserId}`
    );

    return response.data?.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsOwnProfile(state, action: PayloadAction<boolean>) {
      state.isOwnProfile = action.payload;
    },
    setFollowStatus(state, action: PayloadAction<"follow" | "following">) {
      state.followStatus = action.payload;
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
        const isFollowing = action.payload.followers.some(
          (follower: FollowUser) =>
            follower.userName === state.userDetails?.userName
        );
        state.followStatus = isFollowing ? "following" : "follow";
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        const { followedUser } = action.payload;
        state.userDetails = followedUser;
      })
      .addCase(fetchFollowersOrFollowing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowersOrFollowing.fulfilled, (state, action) => {
        state.status = "idle";

        state.followUsers = action.payload.data;
      })
      .addCase(fetchFollowersOrFollowing.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.followUsers = action.payload;
      });
  },
});

export const { setIsOwnProfile, setFollowStatus } = userSlice.actions;
export default userSlice.reducer;
