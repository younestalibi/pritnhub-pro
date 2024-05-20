import axiosHttp from "../../../utils/axios-client";
import config from '../../../utils/config'

const addCartItem = async (cart) => {
  try {
    const response = await axiosHttp.post(`/cart`,cart);
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



const CartServices = {
  addCartItem,
  getCartItems,
};

export default CartServices;
