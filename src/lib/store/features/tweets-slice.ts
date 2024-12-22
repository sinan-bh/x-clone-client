import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchFollowingUserPost,
  fetchTweets,
  fetchUserTweet,
} from "../thunks/tweet-thunk";

export type UserDetails = {
  _id: string;
  name: string;
  userName: string;
  email?: string;
  profilePicture?: string;
  following?: string[];
  followers?: string[];
};

export interface TweetData {
  _id: string;
  user: UserDetails;
  text: string;
  media?: string[];
  likes: string[];
  saved: string[];
  comments: string[];
  reposts: string[];
  createdAt: string;
}

interface TweetsState {
  tweets: TweetData[];
  followingTweets: TweetData[];
  userTweet: TweetData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TweetsState = {
  tweets: [],
  followingTweets: [],
  userTweet: null,
  loading: false,
  error: null,
};

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
      .addCase(fetchFollowingUserPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFollowingUserPost.fulfilled,
        (state, action: PayloadAction<TweetData[]>) => {
          state.loading = false;
          state.followingTweets = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchFollowingUserPost.rejected, (state, action: any) => {
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
