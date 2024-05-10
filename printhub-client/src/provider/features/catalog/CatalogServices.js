import axiosHttp from "../../../utils/axios-client";
import config from '../../../utils/config'
console.log(config)
const getCatalogs = async () => {
  try {
    const response = await axiosHttp.get(`/catalog`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteCatalogById = async (id) => {
  try {
    const response = await axiosHttp.delete(`/catalog/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const createCatalog = async (catalog) => {
  try {
    const response = await axiosHttp.post(`/catalog`,catalog,config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


const catalogService = {
  getCatalogs,
  deleteCatalogById,
  createCatalog
};

export default catalogService;
