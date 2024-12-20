import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/store/features/auth-slice";
import userReducer from "@/lib/store/features/user-slice";
import tweetsReducer from "@/lib/store/features/tweets-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      tweets: tweetsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
