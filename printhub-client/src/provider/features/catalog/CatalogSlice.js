import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import catalogService from "./CatalogServices";
import { initialState, resetCatalogState } from "./CatalogState";

export const getCatalogs = createAsyncThunk(
  "catalog/get-all",
  async (_,thunkAPI) => {
    try {
      return await catalogService.getCatalogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCatalog = createAsyncThunk(
  "catalog/create-one",
  async (catalog, thunkAPI) => {
    try {
      return await catalogService.createCatalog(catalog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCatalogById = createAsyncThunk(
  "catalog/delete-one",
  async (id, thunkAPI) => {
    try {
      return await catalogService.deleteCatalogById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCatalog = createAsyncThunk(
  "catalog/update-one",
  async (catalog, thunkAPI) => {
    try {
      return await catalogService.updateCatalog(catalog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateCatalog = createAction("catalog/reset-state");

export const CatalogSlice = createSlice({
  name: "catalog",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-catalogs
      .addCase(getCatalogs.pending, (state) => {
        resetCatalogState(state);
        state.getCatalogsState.isLoading = true;
      })
      .addCase(getCatalogs.fulfilled, (state, action) => {
        state.getCatalogsState.isError = false;
        state.getCatalogsState.isLoading = false;
        state.getCatalogsState.isSuccess = true;
        state.getCatalogsState.message = action.payload.message;
        state.catalogs = action.payload.catalogs;
      })
      .addCase(getCatalogs.rejected, (state, action) => {
        state.getCatalogsState.isError = true;
        state.getCatalogsState.isLoading = false;
        state.getCatalogsState.isSuccess = false;
        state.getCatalogsState.message = action.payload.error;
      })
      // get-all-catalogs
      //   =========================================================================
      // delete-one-by-id
      .addCase(deleteCatalogById.pending, (state) => {
        resetCatalogState(state);
        state.deleteCatalogByIdState.isLoading = true;
      })
      .addCase(deleteCatalogById.fulfilled, (state, action) => {
        state.deleteCatalogByIdState.isError = false;
        state.deleteCatalogByIdState.isLoading = false;
        state.deleteCatalogByIdState.isSuccess = true;
        state.deleteCatalogByIdState.message = action.payload.message;
        state.catalogs = state.catalogs.filter((catalog) => {
          return catalog.id != action.payload.id;
        });
      })
      .addCase(deleteCatalogById.rejected, (state, action) => {
        state.deleteCatalogByIdState.isError = true;
        state.deleteCatalogByIdState.isLoading = false;
        state.deleteCatalogByIdState.isSuccess = false;
        state.deleteCatalogByIdState.message = action.payload.error;

      })
      // delete-one-by-id
      //   =========================================================================
      // create-one
      .addCase(createCatalog.pending, (state) => {
        resetCatalogState(state);
        state.createCatalogState.isLoading = true;
      })
      .addCase(createCatalog.fulfilled, (state, action) => {
        state.createCatalogState.isError = false;
        state.createCatalogState.isLoading = false;
        state.createCatalogState.isSuccess = true;
        state.createCatalogState.message = action.payload.message;
        state.catalogs.unshift(action.payload.catalog);
      })
      .addCase(createCatalog.rejected, (state, action) => {
        // state.message = action.payload.response.data.errors;
        state.createCatalogState.isError = true;
        state.createCatalogState.isLoading = false;
        state.createCatalogState.isSuccess = false;
        state.createCatalogState.message = action.payload.error;
      })
      // create-one
      //   =========================================================================
      // update-one
      .addCase(updateCatalog.pending, (state) => {
        resetCatalogState(state);
        state.updateCatalogState.isLoading = true;
      })
      .addCase(updateCatalog.fulfilled, (state, action) => {
        state.updateCatalogState.isError = false;
        state.updateCatalogState.isLoading = false;
        state.updateCatalogState.isSuccess = true;
        state.updateCatalogState.message = action.payload.message;
        const index = state.catalogs.findIndex(e => e.id === action.payload.catalog.id);
        if (index !== -1) {
          state.catalogs[index] = action.payload.catalog;
        }
      })
      .addCase(updateCatalog.rejected, (state, action) => {
        state.updateCatalogState.isError = true;
        state.updateCatalogState.isLoading = false;
        state.updateCatalogState.isSuccess = false;
        state.updateCatalogState.message = action.payload.error;
      })
      // update-one
      //   =========================================================================
      //reset-state-catalog
      .addCase(resetStateCatalog, (state) => {
        resetCatalogState(state);
      });
  },
});

export default CatalogSlice.reducer;
