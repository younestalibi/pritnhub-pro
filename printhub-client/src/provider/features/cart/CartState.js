export const initialCartState = {
  carts: [],
  addCartItemState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  getCartItemsState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deleteItemByIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  clearCartState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  
};
export const resetCartState = (state) => {
  state.addCartItemState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  state.getCartItemsState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  state.deleteItemByIdState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  state.clearCartState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
 
};
