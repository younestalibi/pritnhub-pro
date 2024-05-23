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
export const createAddress = createAsyncThunk(
  "address/create-one",
  async (address, thunkAPI) => {
    try {
      return await AddressServices.createAddress(address);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAddressById = createAsyncThunk(
  "address/delete-one",
  async (id, thunkAPI) => {
    try {
      return await AddressServices.deleteAddressById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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
        console.log(action)
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.getAddressesState.isError = true;
        state.getAddressesState.isLoading = false;
        state.getAddressesState.isSuccess = false;
        state.getAddressesState.message = action.payload.error;
      })
      // get-all-addresses
      //   =========================================================================
      // delete-one-by-id
      .addCase(deleteAddressById.pending, (state) => {
        resetAddressState(state);
        state.deleteAddressState.isLoading = true;
      })
      .addCase(deleteAddressById.fulfilled, (state, action) => {
        state.deleteAddressState.isError = false;
        state.deleteAddressState.isLoading = false;
        state.deleteAddressState.isSuccess = true;
        state.deleteAddressState.message = action.payload.message;
        state.addresses = state.addresses.filter((address) => {
          return address.id != action.payload.id;
        });
      })
      .addCase(deleteAddressById.rejected, (state, action) => {
        console.log(action)
        state.deleteAddressState.isError = true;
        state.deleteAddressState.isLoading = false;
        state.deleteAddressState.isSuccess = false;
        state.deleteAddressState.message = action.payload.error;

      })
      // delete-one-by-id
      //   =========================================================================
      // create-one
      .addCase(createAddress.pending, (state) => {
        resetAddressState(state);
        state.createAddressState.isLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.createAddressState.isError = false;
        state.createAddressState.isLoading = false;
        state.createAddressState.isSuccess = true;
        state.createAddressState.message = action.payload.message;
        state.addresses.unshift(action.payload.address);
        console.log(action)
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.createAddressState.isError = true;
        state.createAddressState.isLoading = false;
        state.createAddressState.isSuccess = false;
        state.createAddressState.message = action.payload.error;
      })
      // create-one
      //   =========================================================================
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
