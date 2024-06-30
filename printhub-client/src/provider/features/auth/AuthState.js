export const initialAuthState = {
  user: null,
  profile: null,
  users:[],
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
  getAllUsersState: {
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
  deleteUserByIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};
export const resetAuthState = (state) => {
  state.registerState = { ...initialAuthState.registerState };
  state.loginState = { ...initialAuthState.loginState };
  state.logoutState = { ...initialAuthState.logoutState };
  state.getUserState = { ...initialAuthState.getUserState };
  state.getAllUsersState = { ...initialAuthState.getAllUsersState };
  state.updateProfileState = { ...initialAuthState.updateProfileState };
  state.updatePasswordState = { ...initialAuthState.updatePasswordState };
  state.deleteUserByIdState = { ...initialAuthState.deleteUserByIdState };
};