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

const authService = {
  login,
  getUser,
  register,
  logout,
};

export default authService;
