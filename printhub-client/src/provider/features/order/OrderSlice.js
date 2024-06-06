import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { initialOrderState, resetOrderState } from "./OrderState";
import OrderServices from "./OrderServices";

export const getOrders = createAsyncThunk("order/get-all", async (thunkAPI) => {
  try {
    return await OrderServices.getOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
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

export const deleteOrderById = createAsyncThunk(
  "order/delete-one",
  async (id, thunkAPI) => {
    try {
      return await OrderServices.deleteOrderById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/update-one",
  async (order, thunkAPI) => {
    try {
      return await OrderServices.updateOrderStatus(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetStateOrder = createAction("order/reset-state");

export const OrderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      // get-all-orders
      .addCase(getOrders.pending, (state) => {
        resetOrderState(state);
        state.getOrdersState.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrdersState.isError = false;
        state.getOrdersState.isLoading = false;
        state.getOrdersState.isSuccess = true;
        state.getOrdersState.message = action.payload.message;
        state.orders = action.payload.orders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.getOrdersState.isError = true;
        state.getOrdersState.isLoading = false;
        state.getOrdersState.isSuccess = false;
        state.getOrdersState.message = action.payload.error;
      })
      // get-all-orders
      //   =========================================================================
      // delete-one-by-id
      .addCase(deleteOrderById.pending, (state) => {
        resetOrderState(state);
        state.deleteOrderByIdState.isLoading = true;
      })
      .addCase(deleteOrderById.fulfilled, (state, action) => {
        state.deleteOrderByIdState.isError = false;
        state.deleteOrderByIdState.isLoading = false;
        state.deleteOrderByIdState.isSuccess = true;
        state.deleteOrderByIdState.message = action.payload.message;
        state.orders = state.orders.filter((order) => {
          return order.id != action.payload.id;
        });
      })
      .addCase(deleteOrderById.rejected, (state, action) => {
        state.deleteOrderByIdState.isError = true;
        state.deleteOrderByIdState.isLoading = false;
        state.deleteOrderByIdState.isSuccess = false;
        state.deleteOrderByIdState.message = action.payload.error;

      })
      // delete-one-by-id
      //   =========================================================================
      // create-one
      .addCase(createOrder.pending, (state) => {
        resetOrderState(state);
        state.createOrderState.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderState.isError = false;
        state.createOrderState.isLoading = false;
        state.createOrderState.isSuccess = true;
        state.createOrderState.message = action.payload.message;
        state.orders.unshift(action.payload.orderItem);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderState.isError = true;
        state.createOrderState.isLoading = false;
        state.createOrderState.isSuccess = false;
        state.createOrderState.message = action.payload.error;
      })
      // create-one
      //   =========================================================================
      // update-one
      .addCase(updateOrderStatus.pending, (state) => {
        resetOrderState(state);
        state.updateOrderStatusState.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateOrderStatusState.isError = false;
        state.updateOrderStatusState.isLoading = false;
        state.updateOrderStatusState.isSuccess = true;
        state.updateOrderStatusState.message = action.payload.message;
        const index = state.orders.findIndex(
          (e) => e.id === action.payload.order.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateOrderStatusState.isError = true;
        state.updateOrderStatusState.isLoading = false;
        state.updateOrderStatusState.isSuccess = false;
        state.updateOrderStatusState.message = action.payload.error;
      })
      // update-one
      //   =========================================================================
      //reset-state-product
      .addCase(resetStateOrder, (state) => {
        resetOrderState(state);
      });
  },
});

export default OrderSlice.reducer;
