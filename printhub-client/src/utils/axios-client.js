import axios from "axios";

const axiosHttp = axios.create({
  baseURL: "http://localhost:8000/api/"
});

axiosHttp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

axiosHttp.interceptors.response.use(
  (response) => {
    console.log(response)
    console.log('res')
    return response;

  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
    return error;
  }
);

export default axiosHttp;
