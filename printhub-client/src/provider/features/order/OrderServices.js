import axiosHttp from "../../../utils/axios-client";
import config from '../../../utils/config'

const getOrders = async () => {
  try {
    const response = await axiosHttp.get(`/order`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteOrderById = async (id) => {
  try {
    const response = await axiosHttp.delete(`/order/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// const getProductById = async (id) => {
//   try {
//     const response = await axiosHttp.get(`/product/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
const createOrder = async (order) => {
  try {
    const response = await axiosHttp.post(`/order`,order);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const updateOrderStatus = async ({id,status}) => {
  try {
    const response = await axiosHttp.put(`/order/update/${id}`,status);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


const OrderServices = {
  getOrders,
  deleteOrderById,
  createOrder,
  updateOrderStatus,
  // getProductById
};

export default OrderServices;
