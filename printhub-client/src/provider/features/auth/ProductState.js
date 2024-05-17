// const getUserfromLocalStorage = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : null;

export const initialAuthState = {
  user: null,
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
};
export const resetAuthState = (state) => {
  state.registerState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  state.loginState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  state.logoutState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  state.getUserState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
};
