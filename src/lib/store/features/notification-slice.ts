import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotification } from "../thunks/notification-thunk";
import { NotificationData } from "@/utils/types/types";




interface CommentState {
  notifications: NotificationData[] | null;
  pendign: boolean;
  err: string | null;
}

const initialState: CommentState = {
  notifications: [],
  pendign: false,
  err: null,
};

const notificationSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationData[]>) => {
      state.notifications = action.payload;
    },
    setAddNotificaiton: (state, action: PayloadAction<NotificationData>) => {
      state.notifications?.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.pendign = true;
        state.err = null;
      })
      .addCase(
        fetchNotification.fulfilled,
        (state, action: PayloadAction<NotificationData[]>) => {
          state.pendign = false;
          state.notifications = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchNotification.rejected, (state, action: any) => {
        state.pendign = false;
        state.err = action.payload;
      });
  },
});

export const { setAddNotificaiton, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
