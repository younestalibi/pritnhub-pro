import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./AuthServices";
import { initialAuthState, resetAuthState } from "./AuthState";

const initialState = initialAuthState;
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

export const getUser = createAsyncThunk(
  "auth/get-user",
  async (_, thunkAPI) => {
    try {
      return await authService.getUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteUserById = createAsyncThunk(
  "auth/delete-one-user",
  async (id=null, thunkAPI) => {
    try {
      return await authService.deleteUserById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllUser = createAsyncThunk(
  "auth/get-users",
  async (_, thunkAPI) => {
    try {
      return await authService.getAllUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (profile, thunkAPI) => {
    try {
      return await authService.updateProfile(profile);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/update-password",
  async (password, thunkAPI) => {
    try {
      return await authService.updatePassword(password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetStateUser = createAction("auth/reset-state");

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // register
      .addCase(register.pending, (state) => {
        resetAuthState(state);
        state.registerState.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerState.isError = false;
        state.registerState.isLoading = false;
        state.registerState.isSuccess = true;
        state.registerState.message = action.payload.message;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.registerState.isError = true;
        state.registerState.isSuccess = false;
        state.registerState.isLoading = false;
        state.registerState.message = action.payload.error;
      })
      // register
      //   ----------------------
      // login
      .addCase(login.pending, (state) => {
        resetAuthState(state);
        state.loginState.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginState.isError = false;
        state.loginState.isLoading = false;
        state.loginState.isSuccess = true;
        state.loginState.message = action.payload.message;
        state.user = action.payload.user;
        state.profile = action.payload.user.profile;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginState.isError = true;
        state.loginState.isSuccess = false;
        state.loginState.isLoading = false;
        state.loginState.message = action.payload.error;
      })
      // login
      //   ----------------------
      // logout
      .addCase(logout.pending, (state) => {
        resetAuthState(state);
        state.logoutState.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutState.isLoading = false;
        state.logoutState.isSuccess = true;
        state.logoutState.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutState.isError = true;
        state.logoutState.isSuccess = false;
        state.logoutState.isLoading = false;
        state.logoutState.message = action.payload.error;
      })
      // logout
      //   ----------------------
      // getUser
      .addCase(getUser.pending, (state) => {
        resetAuthState(state);
        state.getUserState.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUserState.isError = false;
        state.getUserState.isLoading = false;
        state.getUserState.isSuccess = true;
        state.getUserState.message = action.payload.message;
        state.user = action.payload.user;
        state.profile = action.payload.user.profile;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserState.isError = true;
        state.getUserState.isSuccess = false;
        state.getUserState.message = action.payload?.error || "User not found";
        state.getUserState.isLoading = false;
      })
      // getUser
      //   ----------------------
      // getAllUser
      .addCase(getAllUser.pending, (state) => {
        resetAuthState(state);
        state.getAllUsersState.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.getAllUsersState.isError = false;
        state.getAllUsersState.isLoading = false;
        state.getAllUsersState.isSuccess = true;
        state.getAllUsersState.message = action.payload.message;
        state.users = action.payload.users;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.getAllUsersState.isError = true;
        state.getAllUsersState.isSuccess = false;
        state.getAllUsersState.message =
          action.payload?.error || "Users not found";
        state.getAllUsersState.isLoading = false;
      })
      // getAllUser
      //   ----------------------
      // update-profile
      .addCase(updateProfile.pending, (state) => {
        resetAuthState(state);
        state.updateProfileState.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileState.isError = false;
        state.updateProfileState.isLoading = false;
        state.updateProfileState.isSuccess = true;
        state.updateProfileState.message = action.payload.message;
        state.user = action.payload.user;
        state.profile = action.payload.user.profile;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateProfileState.isError = true;
        state.updateProfileState.isSuccess = false;
        state.updateProfileState.message = action.payload.error;
        state.updateProfileState.isLoading = false;
      })
      // update-profile
      //   ----------------------
      // update-password
      .addCase(updatePassword.pending, (state) => {
        resetAuthState(state);
        state.updatePasswordState.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.updatePasswordState.isError = false;
        state.updatePasswordState.isLoading = false;
        state.updatePasswordState.isSuccess = true;
        state.updatePasswordState.message = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.updatePasswordState.isError = true;
        state.updatePasswordState.isSuccess = false;
        state.updatePasswordState.message = action.payload.error;
        state.updatePasswordState.isLoading = false;
      })
      // update-password
      //   =========================================================================
      // delete-one-by-id
      .addCase(deleteUserById.pending, (state) => {
        resetAuthState(state);
        state.deleteUserByIdState.isLoading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        console.log(action)
        state.deleteUserByIdState.isError = false;
        state.deleteUserByIdState.isLoading = false;
        state.deleteUserByIdState.isSuccess = true;
        state.deleteUserByIdState.message = action.payload.message;
        state.users = state.users.filter((user) => {
          return user.id != action.payload.id;
        });
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        console.log(action)
        state.deleteUserByIdState.isError = true;
        state.deleteUserByIdState.isLoading = false;
        state.deleteUserByIdState.isSuccess = false;
        state.deleteUserByIdState.message = action.payload.error;
      })
      // delete-one-by-id
      //   ----------------------
      // reset-state-user
      .addCase(resetStateUser, (state) => {
        resetAuthState(state);
      });
  },
});

export default authSlice.reducer;
