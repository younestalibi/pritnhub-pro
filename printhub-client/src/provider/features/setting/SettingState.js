export const initialSettingState = {
  settings: null,
  getSettingsState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  updateSettingState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  resetSettingState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  
};
export const resetSettingState = (state) => {
  state.getSettingsState = { ...initialSettingState.getSettingsState };
  state.updateSettingState = { ...initialSettingState.updateSettingState };
  state.resetSettingState = { ...initialSettingState.resetSettingState };
  
};
