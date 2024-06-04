export const initialOrderState = {
  orders: [],
  getOrdersState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deleteOrderByIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
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
  updateOrderStatusState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};
export const resetOrderState = (state) => {
  state.getOrdersState = { ...initialOrderState.getOrdersState };
  state.deleteOrderByIdState = {...initialOrderState.deleteOrderByIdState};
  // state.getProductByIdState = { ...initialOrderState.getProductByIdState };
  state.createOrderState = { ...initialOrderState.createOrderState };
  state.updateOrderStatusState = { ...initialOrderState.updateOrderStatusState };
};
