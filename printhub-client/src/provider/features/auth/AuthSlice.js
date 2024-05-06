import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthServices";

const getUserfromLocalStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getUser = createAsyncThunk("auth/get-user", async (thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
    // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action)
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action)
        state.isError = true;
        state.isSuccess = false;
        // state.message = action.payload.response.data.errors;
        state.isLoading = false;
      })
    // register
    //   ----------------------
    // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action)
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        // state.message = action.payload.response.data.errors;
        state.isLoading = false;
      })
    // login
    //   ----------------------
    // logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        console.log("loading");
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;

        state.message = action.payload.message;
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        // state.message = action.error;
      })
    // logout
    //   ----------------------
    // getUser
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action)
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getuser = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action)
        state.isError = true;
        state.isSuccess = false;
        // state.message = action.error;
        state.user = null;
        state.isLoading = false;
      });
    // getUser
    //   ----------------------
  },
});

export default authSlice.reducer;
