export const initialState = {
  catalogs: [],
  getCatalogsState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  deleteCatalogByIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  createCatalogState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};
export const resetCatalogState = (state) => {
  state.getCatalogsState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  state.deleteCatalogByIdState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  state.createCatalogState={
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  }
  console.log('rest catalog state')
};
