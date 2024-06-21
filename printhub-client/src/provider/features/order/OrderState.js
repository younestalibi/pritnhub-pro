export const initialOrderState = {
  orders: [],
  userOrders: [],
  getUserOrdersState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
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
  state.getUserOrdersState = { ...initialOrderState.getUserOrdersState };
  state.deleteOrderByIdState = { ...initialOrderState.deleteOrderByIdState };
  state.createOrderState = { ...initialOrderState.createOrderState };
  state.updateOrderStatusState = {
    ...initialOrderState.updateOrderStatusState,
  };
};
