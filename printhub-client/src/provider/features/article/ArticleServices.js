import axiosHttp from "../../../utils/axios-client";
import config from '../../../utils/config'

const getArticles = async () => {
  try {
    const response = await axiosHttp.get(`/article`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteArticleById = async (id) => {
  try {
    const response = await axiosHttp.delete(`/article/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const createArticle = async (article) => {
  try {
    const response = await axiosHttp.post(`/article`,article,config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const updateArticle = async ({id,article}) => {
  try {
    const response = await axiosHttp.put(`/article/update/${id}`,article,config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


const articleService = {
  getArticles,
  deleteArticleById,
  createArticle,
  updateArticle
};

export default articleService;
