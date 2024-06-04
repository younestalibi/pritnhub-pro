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
// const deleteProductById = async (id) => {
//   try {
//     const response = await axiosHttp.delete(`/product/delete/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
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
// const updateProduct = async ({id,product}) => {
//   try {
//     const response = await axiosHttp.put(`/product/update/${id}`,product,config);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };


const OrderServices = {
  getOrders,
  // deleteProductById,
  createOrder,
  // updateProduct,
  // getProductById
};

export default OrderServices;
