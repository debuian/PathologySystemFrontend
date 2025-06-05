import axios from "axios";
import { APP_CONFIG } from "~/config/config";

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.data) {
      return response.data;
    } else response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
