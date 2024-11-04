import axios from 'axios';
import { logout } from '../services/authServices';

const api = axios.create({
  baseURL: 'http://localhost:8080/pos',
});

export const setAuthInterceptor = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;  // Obtenemos el token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(logout());
        window.location.href = '/login'; 
      }
      return Promise.reject(error);
    }
  );
};

export default api;

