import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchFollowingUserPost,
  fetchLikedTweets,
  fetchTweetById,
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
  createdAt?: string;
};

export type Comment = {
  _id: string;
  user: UserDetails;
  text: string;
  createdAt: string;
};

export interface TweetData {
  _id: string;
  user: UserDetails;
  text: string;
  media?: string[];
  likes: string[];
  saved: string[];
  comments: Comment[];
  reposts: string[];
  createdAt: string;
}

export interface CommentData {
  _id: string;
  user: UserDetails;
  tweet: TweetData[];
  text: string;
}

interface TweetsState {
  tweets: TweetData[];
  tweet: TweetData | null;
  followingTweets: TweetData[];
  userTweet: TweetData[] | null;
  userLikes: TweetData[] | null;
  activeTab: "forYou" | "following";
  comments: CommentData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TweetsState = {
  tweets: [],
  tweet: null,
  followingTweets: [],
  userLikes: [],
  activeTab: "forYou",
  comments: [],
  userTweet: null,
  loading: false,
  error: null,
};

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload || "forYou";
    },
  },
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
      })
      .addCase(fetchLikedTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLikedTweets.fulfilled,
        (state, action: PayloadAction<TweetData[]>) => {
          state.loading = false;
          state.userLikes = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchLikedTweets.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(
        fetchTweetById.fulfilled,
        (state, action: PayloadAction<TweetData>) => {
          console.log(action.payload);

          state.tweet = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchTweetById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveTab } = tweetsSlice.actions;

export default tweetsSlice.reducer;
