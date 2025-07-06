import axios from 'axios';
import Store from '../redux/Store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/zgs/api', 
  headers: {
    'Content-Type': 'application/json',
    
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = Store.getState();
    const token = state.user.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
