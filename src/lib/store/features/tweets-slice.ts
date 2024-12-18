import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export type UserDetails = {
  _id: string;
  name: string;
  userName: string;
  email?: string;
  profilePicture?: string;
};

export interface TweetData {
  user: UserDetails;
  text: string;
  media?: string[];
  likes: string[];
  comments: string[];
  reposts: string[];
  createdAt: string;
}

interface TweetsState {
  tweets: TweetData[];
  userTweet: TweetData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TweetsState = {
  tweets: [],
  userTweet: null,
  loading: false,
  error: null,
};

// create Tweet
export const createTweet = createAsyncThunk(
  "tweets/creatTweet",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const currentUser = Cookies.get("user");
      const user = JSON.parse(currentUser || "{}");
      const response = await axios.post(
        "http://localhost:3001/api/tweets",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        }
      );
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
      const currentUser = Cookies.get("user");
      const user = JSON.parse(currentUser || "{}");
      const response = await axios.get("http://localhost:3001/api/tweets", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
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

// Fetch User Tweets
export const fetchUserTweet = createAsyncThunk<TweetData[], string>(
  "tweets/fetchUserTweet",
  async (userId: string, { rejectWithValue }) => {
    try {
      const currentUser = Cookies.get("user");
      const user = JSON.parse(currentUser || "{}");
      const response = await axios.get(
        `http://localhost:3001/api/tweets/${userId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        }
      );
      return response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tweets"
      );
    }
  }
);

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTweets.fulfilled,
        (state, action: PayloadAction<TweetData[]>) => {
          state.loading = false;
          state.tweets = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchTweets.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserTweet.fulfilled,
        (state, action: PayloadAction<TweetData[]>) => {
          state.loading = false;
          state.userTweet = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUserTweet.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tweetsSlice.reducer;
