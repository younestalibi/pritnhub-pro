import axiosHttp from "../../../utils/axios-client";
const login = async (user) => {
  try {
    const response = await axiosHttp.post(`auth/login`, user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const register = async (user) => {
  try {
    const response = await axiosHttp.post(`auth/register`, user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const logout = async () => {
  try {
    const response = await axiosHttp.post(`auth/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getUser = async () => {
  try {
    const response = await axiosHttp.get(`auth/user`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const getAllUser = async () => {
  try {
    const response = await axiosHttp.get(`auth/users`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteUserById = async (id) => {
  try {
    const response = await axiosHttp.delete(`auth/user/${id && id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const updateProfile = async (profile) => {
  try {
    const response = await axiosHttp.put(`auth/update`, profile);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const updatePassword = async (password) => {
  try {
    const response = await axiosHttp.put(`auth/update/password`, password);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const authService = {
  login,
  getUser,
  register,
  logout,
  updateProfile,
  updatePassword,
  getAllUser,
  deleteUserById
};

export default authService;
