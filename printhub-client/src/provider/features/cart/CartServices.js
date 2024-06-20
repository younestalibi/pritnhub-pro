import axiosHttp from "../../../utils/axios-client";
import config from '../../../utils/config'

const addCartItem = async (cart) => {
  try {
    const response = await axiosHttp.post(`/cart`,cart,config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getCartItems = async () => {
  try {
    const response = await axiosHttp.get(`/cart`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteItemById = async (id) => {
  try {
    const response = await axiosHttp.delete(`/cart/remove/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const clearCart = async () => {
  try {
    const response = await axiosHttp.delete(`/cart/clear`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};



const CartServices = {
  addCartItem,
  getCartItems,
  deleteItemById,
  clearCart
};

export default CartServices;
