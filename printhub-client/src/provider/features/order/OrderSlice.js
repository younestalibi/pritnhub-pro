import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { initialOrderState, resetOrderState } from "./OrderState";
import OrderServices from "./OrderServices";

// export const getProducts = createAsyncThunk(
//   "product/get-all",
//   async (thunkAPI) => {
//     try {
//       return await ProductServices.getProducts();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const createOrder = createAsyncThunk(
  "order/create-one",
  async (order, thunkAPI) => {
    try {
      return await OrderServices.createOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
export const resetStateOrder = createAction("order/reset-state");

export const OrderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-products
      // .addCase(getProducts.pending, (state) => {
      //   resetProductState(state);
      //   state.getProductsState.isLoading = true;
      // })
      // .addCase(getProducts.fulfilled, (state, action) => {
      //   state.getProductsState.isError = false;
      //   state.getProductsState.isLoading = false;
      //   state.getProductsState.isSuccess = true;
      //   state.getProductsState.message = action.payload.message;
      //   state.products = action.payload.products;
      // })
      // .addCase(getProducts.rejected, (state, action) => {
      //   state.getProductsState.isError = true;
      //   state.getProductsState.isLoading = false;
      //   state.getProductsState.isSuccess = false;
      //   state.getProductsState.message = action.payload.error;
      // })
      // // get-all-products
      // //   =========================================================================
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
      // delete-one-by-id
      //   =========================================================================
      // create-one
      .addCase(createOrder.pending, (state) => {
        resetOrderState(state);
        state.createOrderState.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log(action)
        state.createOrderState.isError = false;
        state.createOrderState.isLoading = false;
        state.createOrderState.isSuccess = true;
        state.createOrderState.message = action.payload.message;
        state.orders.unshift(action.payload.orderItem);
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log(action)
        state.createOrderState.isError = true;
        state.createOrderState.isLoading = false;
        state.createOrderState.isSuccess = false;
        state.createOrderState.message = action.payload.error;
      })
      // create-one
      //   =========================================================================
      // update-one
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
      // update-one
      //   =========================================================================
      // get-product-by-id
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
      // get-product-by-id
      //   =========================================================================
      //reset-state-product
      .addCase(resetStateOrder, (state) => {
        resetOrderState(state);
      });
  },
});

export default OrderSlice.reducer;
