import axios from 'axios';
import { HOST_BACKEND } from './constants';

const axiosInstance = axios.create({
  baseURL: HOST_BACKEND,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;