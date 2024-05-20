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
 
};
