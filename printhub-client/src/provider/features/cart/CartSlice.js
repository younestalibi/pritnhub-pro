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
export const deleteItemById = createAsyncThunk(
  "cart/delete-one",
  async (id, thunkAPI) => {
    try {
      return await CartServices.deleteItemById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const clearCart = createAsyncThunk(
  "cart/clear-cart",
  async (thunkAPI) => {
    try {
      return await CartServices.clearCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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
        state.getCartItemsState.isError = true;
        state.getCartItemsState.isLoading = false;
        state.getCartItemsState.isSuccess = false;
        state.getCartItemsState.message = action.payload.error;
      })
      // get-all-cart-items
      //   =========================================================================
      // delete-one-by-id
      .addCase(deleteItemById.pending, (state) => {
        resetCartState(state);
        state.deleteItemByIdState.isLoading = true;
      })
      .addCase(deleteItemById.fulfilled, (state, action) => {
        state.deleteItemByIdState.isError = false;
        state.deleteItemByIdState.isLoading = false;
        state.deleteItemByIdState.isSuccess = true;
        state.deleteItemByIdState.message = action.payload.message;
        state.carts = state.carts.filter((cart) => {
          return cart.id != action.payload.id;
        });
      })
      .addCase(deleteItemById.rejected, (state, action) => {
        state.deleteItemByIdState.isError = true;
        state.deleteItemByIdState.isLoading = false;
        state.deleteItemByIdState.isSuccess = false;
        state.deleteItemByIdState.message = action.payload.error;
      })
      // delete-one-by-id
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
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.addCartItemState.isError = true;
        state.addCartItemState.isLoading = false;
        state.addCartItemState.isSuccess = false;
        state.addCartItemState.message = action.payload.error;
      })
      // add-cart-item
      //   =========================================================================
      // clear-cart
      .addCase(clearCart.pending, (state) => {
        resetCartState(state);
        state.clearCartState.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.clearCartState.isError = false;
        state.clearCartState.isLoading = false;
        state.clearCartState.isSuccess = true;
        state.clearCartState.message = action.payload.message;
        state.carts = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.clearCartState.isError = true;
        state.clearCartState.isLoading = false;
        state.clearCartState.isSuccess = false;
        state.clearCartState.message = action.payload.error;
      })
      // clear-cart
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
