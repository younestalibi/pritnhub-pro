import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CartServices from "./CartServices";
import { resetCartState, initialCartState } from "./CartState";

export const getCartItems = createAsyncThunk(
  "cart/get-all-items",
  async (thunkAPI) => {
    try {
      return await CartServices.getCartItems();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addCartItem = createAsyncThunk(
  "cart/create-one-item",
  async (cart, thunkAPI) => {
    try {
      return await CartServices.addCartItem(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const deleteCatalogById = createAsyncThunk(
//   "catalog/delete-one",
//   async (id, thunkAPI) => {
//     try {
//       return await catalogService.deleteCatalogById(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
// export const updateCatalog = createAsyncThunk(
//   "catalog/update-one",
//   async (catalog, thunkAPI) => {
//     try {
//       return await catalogService.updateCatalog(catalog);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
export const resetStateCart = createAction("Cart/reset-state");

export const CartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-cart-items
      .addCase(getCartItems.pending, (state) => {
        resetCartState(state);
        state.getCartItemsState.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.getCartItemsState.isError = false;
        state.getCartItemsState.isLoading = false;
        state.getCartItemsState.isSuccess = true;
        state.getCartItemsState.message = action.payload.message;
        state.carts = action.payload.cart.CartItems;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.getCartItemsState.isError = true;
        state.getCartItemsState.isLoading = false;
        state.getCartItemsState.isSuccess = false;
        state.getCartItemsState.message = action.payload.error;
      })
      // get-all-cart-items
      //   =========================================================================
      // // delete-one-by-id
      // .addCase(deleteCatalogById.pending, (state) => {
      //   resetCatalogState(state);
      //   state.deleteCatalogByIdState.isLoading = true;
      // })
      // .addCase(deleteCatalogById.fulfilled, (state, action) => {
      //   state.deleteCatalogByIdState.isError = false;
      //   state.deleteCatalogByIdState.isLoading = false;
      //   state.deleteCatalogByIdState.isSuccess = true;
      //   state.deleteCatalogByIdState.message = action.payload.message;
      //   state.catalogs = state.catalogs.filter((catalog) => {
      //     return catalog.id != action.payload.id;
      //   });
      // })
      // .addCase(deleteCatalogById.rejected, (state, action) => {
      //   state.deleteCatalogByIdState.isError = true;
      //   state.deleteCatalogByIdState.isLoading = false;
      //   state.deleteCatalogByIdState.isSuccess = false;
      //   state.deleteCatalogByIdState.message = action.payload.error;

      // })
      // // delete-one-by-id
      //   =========================================================================
      // add-cart-item
      .addCase(addCartItem.pending, (state) => {
        resetCartState(state);
        state.addCartItemState.isLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.addCartItemState.isError = false;
        state.addCartItemState.isLoading = false;
        state.addCartItemState.isSuccess = true;
        state.addCartItemState.message = action.payload.message;
        state.carts.unshift(action.payload.cartItem);
        console.log(action);
        console.log(state.carts);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.addCartItemState.isError = true;
        state.addCartItemState.isLoading = false;
        state.addCartItemState.isSuccess = false;
        state.addCartItemState.message = action.payload.error;
        console.log(action);
        console.log(state.carts);
      })
      // add-cart-item
      //   =========================================================================
      // // update-one
      // .addCase(updateCatalog.pending, (state) => {
      //   resetCatalogState(state);
      //   state.updateCatalogState.isLoading = true;
      // })
      // .addCase(updateCatalog.fulfilled, (state, action) => {
      //   state.updateCatalogState.isError = false;
      //   state.updateCatalogState.isLoading = false;
      //   state.updateCatalogState.isSuccess = true;
      //   state.updateCatalogState.message = action.payload.message;
      //   const index = state.catalogs.findIndex(e => e.id === action.payload.catalog.id);
      //   if (index !== -1) {
      //     state.catalogs[index] = action.payload.catalog;
      //   }
      // })
      // .addCase(updateCatalog.rejected, (state, action) => {
      //   state.updateCatalogState.isError = true;
      //   state.updateCatalogState.isLoading = false;
      //   state.updateCatalogState.isSuccess = false;
      //   state.updateCatalogState.message = action.payload.error;
      // })
      // // update-one
      //   =========================================================================
      //reset-state-catalog
      .addCase(resetStateCart, (state) => {
        resetCartState(state);
      });
  },
});

export default CartSlice.reducer;
