import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserAPI, loginUserAPI, sendOtpAPI, verifyOtpAPI, resetPasswordAPI, logoutUserAPI } from "./authService";
// import { registerUserAPI, loginUserAPI, sendOtpAPI, verifyOtpAPI, resetPasswordAPI, logoutUserAPI } from "../../service/authService/authService";

const tokenFromStorage = localStorage.getItem("token") || null;
const userFromStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

  //Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(credentials);

      localStorage.setItem("isLoggedIn", true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error || error.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try{
      const token = localStorage.getItem("token");
      if(!token) throw new Error("No token found");

      await logoutUserAPI(token);

      localStorage.setItem("isLoggedIn", false);
      return true;
    }catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message)
    }
  }
);



// Forgot Password - Send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await sendOtpAPI(phone);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Forgot Password - Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const response = await verifyOtpAPI(phone, otp);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Forgot Password - Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ phone, newPassword }, { rejectWithValue }) => {
    try {
      const response = await resetPasswordAPI(phone, newPassword);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const initialState = {
  token: tokenFromStorage,
  user: userFromStorage,
  loading: false,
  error: null,
  registerSuccess: false,

  otpSent: false,
  otpVerified: false,
  resetSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.registerSuccess = false;
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    clearMessage: (state) => {
      state.message = "",
      state.error = null;
    },


  },
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("token")
        localStorage.removeItem("currentUser")
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Otp
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Otp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.resetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearRegisterSuccess, clearMessage } = authSlice.actions;

export default authSlice.reducer;
