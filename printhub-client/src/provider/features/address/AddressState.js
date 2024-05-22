export const initialAddressState = {
  addresses: [],
  getAddressesState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  // deleteAddressByIdState: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
  // getAddressByIdState: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
  // createAddressstate: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
  // updateAddressstate: {
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // },
};
export const resetAddressState = (state) => {
  state.getAddressesState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  // state.deleteAddressByIdState={
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // }
  // state.getAddressByIdState={
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  //   Address:null
  // }
  // state.createAddressstate={
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // }
  // state.updateAddressstate={
  //   isLoading: false,
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  // }
};
