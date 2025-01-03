import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/features/auth-slice";
import userReducer from "@/lib/store/features/user-slice";
import tweetsReducer from "@/lib/store/features/tweets-slice";
import chatReducer from "@/lib/store/features/chat-slice";
import commentsReducer from "@/lib/store/features/comments-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      tweets: tweetsReducer,
      chat: chatReducer,
      comment: commentsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
