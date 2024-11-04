import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  permisos: [],  // Almacenamos los permisos aquí
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token, userEmail, nombre, apellido, role, permisos } = action.payload;
      
      state.token = token;
      state.user = {
        email: userEmail,
        nombre,
        apellido,
        role,
      };
      state.permisos = permisos;  // Guardamos los permisos en el estado
      state.isAuthenticated = true;
      state.loading = false;

      // Guardamos el objeto completo de autenticación en el localStorage
      localStorage.setItem('auth', JSON.stringify({
        token,
        user: { email: userEmail, nombre, apellido, role },
        permisos,
      }));
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.permisos = [];
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem('auth');  // Eliminamos el auth completo de localStorage
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const selectHasPermission = (state, permissionName) => {
  return state.auth.permisos?.some((permiso) => permiso.nombre === permissionName) || false;
};

// Uso en los componentes
export const { setAuth, clearAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
