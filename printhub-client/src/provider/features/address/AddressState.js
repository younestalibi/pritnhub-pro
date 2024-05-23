export const initialAddressState = {
  addresses: [],
  getAddressesState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  createAddressState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deleteAddressState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },

};
export const resetAddressState = (state) => {
  state.getAddressesState={...initialAddressState.getAddressesState}
  state.createAddressState={...initialAddressState.createAddressState}
  state.deleteAddressState={...initialAddressState.deleteAddressState}
};
