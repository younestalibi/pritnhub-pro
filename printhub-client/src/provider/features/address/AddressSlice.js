import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { initialAddressState, resetAddressState } from "./AddressState";
import AddressServices from "./AddressServices";

export const getAddresses = createAsyncThunk(
  "address/get-all",
  async (thunkAPI) => {
    try {
      return await AddressServices.getAddresses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const createProduct = createAsyncThunk(
//   "product/create-one",
//   async (catalog, thunkAPI) => {
//     try {
//       return await ProductServices.createProduct(catalog);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const deleteProductById = createAsyncThunk(
//   "product/delete-one",
//   async (id, thunkAPI) => {
//     try {
//       return await ProductServices.deleteProductById(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const getProductById = createAsyncThunk(
//   "product/get-one",
//   async (id, thunkAPI) => {
//     try {
//       return await ProductServices.getProductById(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const updateProduct = createAsyncThunk(
//   "product/update-one",
//   async (catalog, thunkAPI) => {
//     try {
//       return await ProductServices.updateProduct(catalog);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const resetStateAddress = createAction("address/reset-state");

export const AddressSlice = createSlice({
  name: "address",
  initialState: initialAddressState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-addresses
      .addCase(getAddresses.pending, (state) => {
        resetAddressState(state);
        state.getAddressesState.isLoading = true;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.getAddressesState.isError = false;
        state.getAddressesState.isLoading = false;
        state.getAddressesState.isSuccess = true;
        state.getAddressesState.message = action.payload.message;
        state.addresses = action.payload.addresses;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.getAddressesState.isError = true;
        state.getAddressesState.isLoading = false;
        state.getAddressesState.isSuccess = false;
        state.getAddressesState.message = action.payload.error;
      })
      // get-all-addresses
      //   =========================================================================
      // // delete-one-by-id
      // .addCase(deleteProductById.pending, (state) => {
      //   resetProductState(state);
      //   state.deleteProductByIdState.isLoading = true;
      // })
      // .addCase(deleteProductById.fulfilled, (state, action) => {
      //   state.deleteProductByIdState.isError = false;
      //   state.deleteProductByIdState.isLoading = false;
      //   state.deleteProductByIdState.isSuccess = true;
      //   state.deleteProductByIdState.message = action.payload.message;
      //   state.products = state.products.filter((product) => {
      //     return product.id != action.payload.id;
      //   });
      // })
      // .addCase(deleteProductById.rejected, (state, action) => {
      //   state.deleteProductByIdState.isError = true;
      //   state.deleteProductByIdState.isLoading = false;
      //   state.deleteProductByIdState.isSuccess = false;
      //   state.deleteProductByIdState.message = action.payload.error;

      // })
      // // delete-one-by-id
      // //   =========================================================================
      // // create-one
      // .addCase(createProduct.pending, (state) => {
      //   resetProductState(state);
      //   state.createProductstate.isLoading = true;
      // })
      // .addCase(createProduct.fulfilled, (state, action) => {
      //   state.createProductstate.isError = false;
      //   state.createProductstate.isLoading = false;
      //   state.createProductstate.isSuccess = true;
      //   state.createProductstate.message = action.payload.message;
      //   state.products.unshift(action.payload.product);
      // })
      // .addCase(createProduct.rejected, (state, action) => {
      //   state.createProductstate.isError = true;
      //   state.createProductstate.isLoading = false;
      //   state.createProductstate.isSuccess = false;
      //   state.createProductstate.message = action.payload.error;
      // })
      // // create-one
      // //   =========================================================================
      // // update-one
      // .addCase(updateProduct.pending, (state) => {
      //   resetProductState(state);
      //   state.updateProductstate.isLoading = true;
      // })
      // .addCase(updateProduct.fulfilled, (state, action) => {
      //   state.updateProductstate.isError = false;
      //   state.updateProductstate.isLoading = false;
      //   state.updateProductstate.isSuccess = true;
      //   state.updateProductstate.message = action.payload.message;
      //   const index = state.products.findIndex(e => e.id === action.payload.product.id);
      //   if (index !== -1) {
      //     state.products[index] = action.payload.product;
      //   }
      // })
      // .addCase(updateProduct.rejected, (state, action) => {
      //   state.updateProductstate.isError = true;
      //   state.updateProductstate.isLoading = false;
      //   state.updateProductstate.isSuccess = false;
      //   state.updateProductstate.message = action.payload.error;
      // })
      // // update-one
      // //   =========================================================================
      // // get-product-by-id
      // .addCase(getProductById.pending, (state) => {
      //   resetProductState(state);
      //   state.getProductByIdState.isLoading = true;
      // })
      // .addCase(getProductById.fulfilled, (state, action) => {
      //   state.getProductByIdState.isError = false;
      //   state.getProductByIdState.isLoading = false;
      //   state.getProductByIdState.isSuccess = true;
      //   state.getProductByIdState.message = action.payload.message;
      //   state.getProductByIdState.product=action.payload.product;

      // })
      // .addCase(getProductById.rejected, (state, action) => {
      //   state.getProductByIdState.isError = true;
      //   state.getProductByIdState.isLoading = false;
      //   state.getProductByIdState.isSuccess = false;
      //   state.getProductByIdState.message = action.payload.error;
      // })
      // // get-product-by-id
      //   =========================================================================
      //reset-state-product
      .addCase(resetStateAddress, (state) => {
        resetAddressState(state);
      });
  },
});

export default AddressSlice.reducer;
