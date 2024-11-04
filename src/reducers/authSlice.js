import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  permisos: [],
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      const { token, userEmail, nombre, apellido, role, permisos } = action.payload;

      // Actualizar el estado con los datos de usuario
      state.token = token;
      state.user = {
        email: userEmail,
        nombre,
        apellido,
        role,
      };
      state.permisos = permisos;
      state.isAuthenticated = true;
      state.loading = false;

      // Guardar solo el objeto `auth` completo en localStorage
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

      // Eliminar `auth` del `localStorage` en una sola operación
      localStorage.removeItem('auth');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Selector para verificar si el usuario tiene un permiso específico
export const selectHasPermission = (state, permissionName) => {
  return Array.isArray(state.auth.permisos) && 
         state.auth.permisos.some((permiso) => permiso.nombre === permissionName);
};

// Exportamos las acciones y el reducer
export const { setAuth, clearAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
