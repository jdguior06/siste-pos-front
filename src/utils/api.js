import axios from 'axios';

const api = axios.create({
  baseURL: 'http://107.20.164.132:8080/pos',
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
};

export default api;

