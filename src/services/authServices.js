  import { setAuth, clearAuth } from '../reducers/authSlice';
  import api from '../utils/api';

  // Login
  export const login = (username, password) => async (dispatch) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, email: userEmail, nombre, apellido, role } = response.data;

      // Guardamos el token en el localStorage
      localStorage.setItem('token', token);

      // Disparamos la acción de autenticación con el token y los detalles del usuario
      dispatch(setAuth({
        token,
        userEmail,
        nombre,
        apellido,
        role: role.nombre,  // Usamos el campo "nombre" del rol
      }));

      return { success: true, message: "Inicio de sesión exitoso" };

    } catch (error) {
      const message = error.response && error.response.data
        ? error.response.data.message
        : "Error en la autenticación";

      return { success: false, message };  // Retornamos el error para manejar en el componente
    }
  };

  // Logout
  export const logout = () => (dispatch) => {
    localStorage.removeItem('token');  // Elimina el token
    dispatch(clearAuth());  // Limpia el estado de autenticación en Redux
  };

  