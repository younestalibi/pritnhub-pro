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
  updateCatalogState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};
export const resetCatalogState = (state) => {
  state.getCatalogsState=initialState.getCatalogsState
  state.deleteCatalogByIdState=initialState.deleteCatalogByIdState
  state.createCatalogState=initialState.createCatalogState
  state.updateCatalogState=initialState.updateCatalogState
};
