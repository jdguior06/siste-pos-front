import api from '../utils/api';

// Obtener todas las cajas de una sucursal
export const fetchCajasApi = async (idSucursal) => {
  try {
    const response = await api.get(`/sucursales/${idSucursal}/caja`);
    console.log("Cajas obtenidas:", response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las cajas');
  }
};

// Obtener una caja específica de una sucursal
export const fetchCajaApi = async (idSucursal, idCaja) => {
  try {
    const response = await api.get(`/sucursales/${idSucursal}/caja/${idCaja}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la caja');
  }
};

// Crear una nueva caja en una sucursal
export const addCajaApi = async (idSucursal, caja) => {
  try {
    const response = await api.post(`/sucursales/${idSucursal}/caja`, caja);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la caja');
  }
};

// Actualizar una caja existente en una sucursal
export const updateCajaApi = async (idSucursal, idCaja, caja) => {
  try {
    const response = await api.patch(`/sucursales/${idSucursal}/caja/${idCaja}`, caja);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar la caja');
  }
};

// Desactivar una caja de una sucursal
export const deleteCajaApi = async (idSucursal, idCaja) => {
  try {
    await api.patch(`/sucursales/${idSucursal}/caja/${idCaja}/desactivar`);
    return idCaja;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al desactivar la caja');
  }
};
