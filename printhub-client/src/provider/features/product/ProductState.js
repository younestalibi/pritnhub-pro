export const initialProductState = {
  products: [],
  getProductsState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deleteProductByIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  getProductByIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    product: null,
  },
  createProductstate: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  updateProductstate: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};
export const resetProductState = (state) => {
  state.getProductsState = { ...initialProductState.getProductsState };
  state.deleteProductByIdState = {
    ...initialProductState.deleteProductByIdState,
  };
  state.getProductByIdState = { ...initialProductState.getProductByIdState };
  state.createProductstate = { ...initialProductState.createProductstate };
  state.updateProductstate = { ...initialProductState.updateProductstate };
};
