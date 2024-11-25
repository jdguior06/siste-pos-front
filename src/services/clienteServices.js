import api from '../utils/api';  // Esto sigue siendo tu instancia de Axios configurada

export const fetchClientesApi = async () => {
  try {
    const response = await api.get('/cliente');
    if (response.data.statusCode === 200) {
      return response.data.data;  // Devuelve la lista de clientes
    } else {
      throw new Error(response.data.message || "Error al obtener clientes");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error de red");
  }
};

export const addClienteApi = async (cliente) => {
  try {
    const response = await api.post('/cliente', cliente);
    if (response.data.statusCode === 200) {
      return response.data.data;  // Devuelve el cliente creado
    } else {
      throw new Error(response.data.message || "Error al agregar cliente");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error de red");
  }
};

export const updateClienteApi = async (cliente) => {
  try {
    const response = await api.patch(`/cliente/${cliente.id}`, cliente);
    if (response.data.statusCode === 200) {
      return response.data.data;  // Devuelve el cliente actualizado
    } else {
      throw new Error(response.data.message || "Error al actualizar cliente");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error de red");
  }
};

export const deleteClienteApi = async (id) => {  // Nuevo método para eliminar cliente
  try {
    const response = await api.patch(`/cliente/${id}/desactivar`);
    if (response.data.statusCode === 200) {
      return response.data.data;  // Devuelve la confirmación de desactivación
    } else {
      throw new Error(response.data.message || "Error al eliminar cliente");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error de red");
  }
};
