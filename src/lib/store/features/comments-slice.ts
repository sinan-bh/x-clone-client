import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchComments } from "../thunks/comments-thunk";
import { CommentData } from "@/utils/types/types";



interface CommentState {
  comments: CommentData[] | null;
  pendign: boolean;
  err: string | null;
}

const initialState: CommentState = {
  comments: [],
  pendign: false,
  err: null,
};

const commentSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.pendign = true;
        state.err = null;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<CommentData[]>) => {
          state.pendign = false;
          state.comments = action.payload;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchComments.rejected, (state, action: any) => {
        state.pendign = false;
        state.err = action.payload;
      });
  },
});

export default commentSlice.reducer;
