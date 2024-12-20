import axios from 'axios';
import { clearAuth } from '../reducers/authSlice';

const api = axios.create({
  baseURL: 'http://98.85.18.243:8080/pos/pos',
});

export const setAuthInterceptor = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
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
        store.dispatch(clearAuth());
        window.location.href = '/login'; // Redirige después de limpiar auth
      }
      return Promise.reject(error);
    }
  );
};

export default api;
