import { createSlice } from '@reduxjs/toolkit';
import { decodeJWT } from '../utils/jwt';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,  // Asegúrate de que este valor esté inicialmente en `false`
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token, userEmail, nombre, apellido, role } = action.payload;
      
      state.token = token;
      state.user = {
        email: userEmail,
        nombre,
        apellido,
        role,
      };
      state.isAuthenticated = true;  // Cambiar a `true` al iniciar sesión
      state.loading = false;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;  // Asegúrate de que se limpie correctamente al cerrar sesión
      state.loading = false;
      localStorage.removeItem('token');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
