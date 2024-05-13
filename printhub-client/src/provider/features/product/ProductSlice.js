import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ProductServices from "./ProductServices";
import { initialProductState, resetProductState } from "./ProductState";

export const getProducts = createAsyncThunk(
  "product/get-all",
  async (thunkAPI) => {
    try {
      return await ProductServices.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/create-one",
  async (catalog, thunkAPI) => {
    try {
      return await ProductServices.createProduct(catalog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "product/delete-one",
  async (id, thunkAPI) => {
    try {
      return await ProductServices.deleteProductById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/update-one",
  async (catalog, thunkAPI) => {
    try {
      return await ProductServices.updateProduct(catalog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateProduct = createAction("product/reset-state");

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-products
      .addCase(getProducts.pending, (state) => {
        resetProductState(state);
        state.getProductsState.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsState.isError = false;
        state.getProductsState.isLoading = false;
        state.getProductsState.isSuccess = true;
        state.getProductsState.message = action.payload.message;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductsState.isError = true;
        state.getProductsState.isLoading = false;
        state.getProductsState.isSuccess = false;
        state.getProductsState.message = action.payload.error;
      })
      // get-all-products
      //   =========================================================================
      // delete-one-by-id
      .addCase(deleteProductById.pending, (state) => {
        resetProductState(state);
        state.deleteProductByIdState.isLoading = true;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.deleteProductByIdState.isError = false;
        state.deleteProductByIdState.isLoading = false;
        state.deleteProductByIdState.isSuccess = true;
        state.deleteProductByIdState.message = action.payload.message;
        state.products = state.products.filter((product) => {
          return product.id != action.payload.id;
        });
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.deleteProductByIdState.isError = true;
        state.deleteProductByIdState.isLoading = false;
        state.deleteProductByIdState.isSuccess = false;
        state.deleteProductByIdState.message = action.payload.error;

      })
      // delete-one-by-id
      //   =========================================================================
      // create-one
      .addCase(createProduct.pending, (state) => {
        resetProductState(state);
        state.createProductstate.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductstate.isError = false;
        state.createProductstate.isLoading = false;
        state.createProductstate.isSuccess = true;
        state.createProductstate.message = action.payload.message;
        state.products.unshift(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductstate.isError = true;
        state.createProductstate.isLoading = false;
        state.createProductstate.isSuccess = false;
        state.createProductstate.message = action.payload.error;
      })
      // create-one
      //   =========================================================================
      // update-one
      .addCase(updateProduct.pending, (state) => {
        resetProductState(state);
        state.updateProductstate.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductstate.isError = false;
        state.updateProductstate.isLoading = false;
        state.updateProductstate.isSuccess = true;
        state.updateProductstate.message = action.payload.message;
        const index = state.products.findIndex(e => e.id === action.payload.product.id);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
        console.log(state.products[index])
        console.log(action.payload.product)
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductstate.isError = true;
        state.updateProductstate.isLoading = false;
        state.updateProductstate.isSuccess = false;
        state.updateProductstate.message = action.payload.error;
      })
      // update-one
      //   =========================================================================
      //reset-state-product
      .addCase(resetStateProduct, (state) => {
        resetProductState(state);
      });
  },
});

export default ProductSlice.reducer;
