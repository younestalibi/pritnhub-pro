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
  console.log('hii')
  state.addCartItemState = { ...initialCartState.addCartItemState };
  state.getCartItemsState = { ...initialCartState.getCartItemsState };
  state.deleteItemByIdState = { ...initialCartState.deleteItemByIdState };
  state.clearCartState = { ...initialCartState.clearCartState };
};
