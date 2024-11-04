import api from '../utils/api'; // Usa tu instancia de Axios configurada

// Obtener el tema del usuario autenticado
export const fetchUserTheme = async () => {
  try {
    const response = await api.get('/user/me');
    return response.data.themeColor;
  } catch (error) {
    throw new Error("Error al obtener el tema del usuario", error);
  }
};

// Actualizar el color del tema del usuario
export const updateUserTheme = async (themeColor) => {
  try {
    await api.put('/user/theme', { themeColor });
  } catch (error) {
    throw new Error("Error al actualizar el tema del usuario", error);
  }
};
