import { User } from "@/components/side-bar/side-bar";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface TweetData {
  user: User;
  text: string;
  media?: string[];
  likes: string[];
  comments: string[];
  reposts: string[];
  createdAt: string;
}

interface TweetsState {
  tweets: TweetData[];
  loading: boolean;
  error: string | null;
}

const initialState: TweetsState = {
  tweets: [],
  loading: false,
  error: null,
};

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
      });
  },
});

export default tweetsSlice.reducer;
