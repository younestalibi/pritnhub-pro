export const initialOrderState = {
  orders: [],
  // getProductsState: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
  // deleteProductByIdState: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
  // getProductByIdState: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
  createOrderState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  // updateProductstate: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
};
export const resetOrderState = (state) => {
  // state.getProductsState = { ...initialOrderState.getProductsState };
  // state.deleteProductByIdState = {...initialOrderState.deleteProductByIdState};
  // state.getProductByIdState = { ...initialOrderState.getProductByIdState };
  state.createOrderState = { ...initialOrderState.createOrderState };
  // state.updateProductstate = { ...initialOrderState.updateProductstate };
};