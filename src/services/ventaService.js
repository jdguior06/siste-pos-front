import api from '../utils/api';

export const realizarVentaApi = async (ventaData) => {
  try {
    const response = await api.post('/venta', ventaData);
    return response.data.data; // Asume que la respuesta incluye la venta creada
  } catch (error) {
    console.error("Error de la API:", error.response?.data);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Error al realizar la venta'
    );
  }
};