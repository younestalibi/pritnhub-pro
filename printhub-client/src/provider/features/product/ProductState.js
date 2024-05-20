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
  state.getProductsState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  state.deleteProductByIdState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  state.getProductByIdState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    product:null
  }
  state.createProductstate={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  state.updateProductstate={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
};
