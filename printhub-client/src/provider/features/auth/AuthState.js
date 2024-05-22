export const initialAuthState = {
  user: null,
  profile: null,
  registerState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  loginState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  logoutState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  getUserState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  updateProfileState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  updatePasswordState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};
export const resetAuthState = (state) => {
  state.registerState = initialAuthState.registerState;
  state.loginState = initialAuthState.loginState;
  state.logoutState = initialAuthState.loginState;
  state.getUserState = initialAuthState.getUserState;
  state.updateProfileState = initialAuthState.updateProfileState;
  state.updatePasswordState = initialAuthState.updatePasswordState;
};
