import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthState {
  user: null | {
    id: string;
    username: string;
    email: string;
  };
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3001/api/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { name: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (userData: { otp: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, userData);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const finalSubmission = createAsyncThunk(
  "auth/finalSubmission",
  async (
    userData: {
      name: string;
      email: string;
      profilePicture: string;
      userName: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/final-submission`,
        userData
      );
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { loginField: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { data } = response;
      const userData = data.data;

      Cookies.set(
        "user",
        JSON.stringify({
          userName: userData.user.userName,
          name: userData.user.name,
          profilePicture: userData.user.profilePicture,
          email: userData.user.email,
          token: userData.token,
          id: userData.user.id,
        }),
        { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//Auth Login
export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/google-auth`, { email });
      const { data } = response;
      const userData = data.data;

      Cookies.set(
        "user",
        JSON.stringify({
          userName: userData.user.userName,
          name: userData.user.name,
          profilePicture: userData.user.profilePicture,
          email: userData.user.email,
          token: userData.token,
          id: userData.user.id,
        }),
        { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("user");
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle registration
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
