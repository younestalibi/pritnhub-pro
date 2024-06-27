import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import settingService from "./SettingServices";
import { initialSettingState, resetSettingState } from "./SettingState";

export const getSettings = createAsyncThunk(
  "setting/get-all",
  async (_,thunkAPI) => {
    try {
      return await settingService.getSettings();
    } catch (error) {
      return thunkAPI.rejectWithValue({error: 'Settings not found'});
    }
  }
);
export const resetCatalog = createAsyncThunk(
  "setting/reset-one",
  async (_,thunkAPI) => {
    try {
      return await settingService.resetCatalog();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateSetting = createAsyncThunk(
  "setting/update-one",
  async (setting, thunkAPI) => {
    try {
      return await settingService.updateSetting(setting);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateSetting = createAction("setting/reset-state");

export const SettingSlice = createSlice({
  name: "setting",
  initialState: initialSettingState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-settings
      .addCase(getSettings.pending, (state) => {
        resetSettingState(state);
        state.getSettingsState.isLoading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.getSettingsState.isError = false;
        state.getSettingsState.isLoading = false;
        state.getSettingsState.isSuccess = true;
        state.getSettingsState.message = action.payload.message;
        state.settings = action.payload.settings;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.getSettingsState.isError = true;
        state.getSettingsState.isLoading = false;
        state.getSettingsState.isSuccess = false;
        state.getSettingsState.message = action.payload.error;
      })
      // get-all-settings
      //   =========================================================================
      // create-one
      .addCase(resetCatalog.pending, (state) => {
        resetSettingState(state);
        state.resetSettingState.isLoading = true;
      })
      .addCase(resetCatalog.fulfilled, (state, action) => {
        state.resetSettingState.isError = false;
        state.resetSettingState.isLoading = false;
        state.resetSettingState.isSuccess = true;
        state.resetSettingState.message = action.payload.message;
        state.settings = action.payload.setting;
      })
      .addCase(resetCatalog.rejected, (state, action) => {
        state.resetSettingState.isError = true;
        state.resetSettingState.isLoading = false;
        state.resetSettingState.isSuccess = false;
        state.resetSettingState.message = action.payload.error;
      })
      // create-one
      //   =========================================================================
      // update-one
      .addCase(updateSetting.pending, (state) => {
        resetSettingState(state);
        state.updateSettingState.isLoading = true;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.updateSettingState.isError = false;
        state.updateSettingState.isLoading = false;
        state.updateSettingState.isSuccess = true;
        state.updateSettingState.message = action.payload.message;
        state.settings = action.payload.setting;
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.updateSettingState.isError = true;
        state.updateSettingState.isLoading = false;
        state.updateSettingState.isSuccess = false;
        state.updateSettingState.message = action.payload.error;
      })
      // update-one
      //   =========================================================================
      //reset-state-catalog
      .addCase(resetStateSetting, (state) => {
        resetSettingState(state);
      });
  },
});

export default SettingSlice.reducer;
