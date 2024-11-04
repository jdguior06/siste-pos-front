import { setAuth, clearAuth } from '../reducers/authSlice';
import api from '../utils/api';

// Login
// login function
export const login = (username, password) => async (dispatch) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { token, email: userEmail, nombre, apellido, role } = response.data;

    // No es necesario guardar el token directamente en localStorage aquí.
    dispatch(setAuth({
      token,
      userEmail,
      nombre,
      apellido,
      role: role.nombre,
      permisos: role.permiso,
    }));

    return { success: true, message: "Inicio de sesión exitoso" };

  } catch (error) {
    const message = error.response && error.response.data
      ? error.response.data.message
      : "Error en la autenticación";

    return { success: false, message };
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');  // Elimina el token
  dispatch(clearAuth());  // Limpia el estado de autenticación en Redux
};
  