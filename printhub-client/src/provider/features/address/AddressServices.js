import axiosHttp from "../../../utils/axios-client";
import config from '../../../utils/config'

const getAddresses = async () => {
  try {
    const response = await axiosHttp.get(`/address`);
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
// const createProduct = async (catalog) => {
//   try {
//     const response = await axiosHttp.post(`/product`,catalog,config);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
// const updateProduct = async ({id,product}) => {
//   try {
//     const response = await axiosHttp.put(`/product/update/${id}`,product,config);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };


const AddressServices = {
  getAddresses,
  // deleteProductById,
  // createProduct,
  // updateProduct,
  // getProductById
};

export default AddressServices;
