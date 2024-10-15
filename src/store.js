import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import clienteReducer from './reducers/clienteSlice';
import proveedorReducer from './reducers/proveedorSlice';
import productoReducer from './reducers/productoSlice';
import categoriaReducer from './reducers/categoriaSlice';
import { setAuthInterceptor } from './utils/api';

const tokenFromLocalStorage = localStorage.getItem('token');

const preloadedState = {
  auth: {
    token: tokenFromLocalStorage || null,
    isAuthenticated: !!tokenFromLocalStorage,
    user: null,  // Puedes hacer una petición para cargar datos del usuario si es necesario
    loading: false
  }
};


export const store = configureStore({
  reducer: {
    auth: authReducer,
    clientes: clienteReducer,
    proveedores: proveedorReducer,
    productos: productoReducer,
    categorias: categoriaReducer,
  },
  preloadedState,
});

setAuthInterceptor(store); 