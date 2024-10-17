import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SucursalModal = ({ open, onClose, selectedSucursal, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nit: "",
    nombre: "",
    razon_social: "",
    direccion: "",
  });

  useEffect(() => {
    if (isEditing && selectedSucursal) {
      setFormData({
        codigo: selectedSucursal.codigo || "",
        nit: selectedSucursal.nit || "",
        nombre: selectedSucursal.nombre || "",
        razon_social: selectedSucursal.razon_social || "",
        direccion: selectedSucursal.direccion || "",
      });
    } else {
      setFormData({
        codigo: "",
        nit: "",
        nombre: "",
        razon_social: "",
        direccion: "",
      });
    }
  }, [isEditing, selectedSucursal]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Llamamos a la función onSave con los datos de la sucursal
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl mb-4">{isEditing ? "Editar Sucursal" : "Crear Sucursal"}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Código</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Código de la sucursal"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">NIT</label>
            <input
              type="text"
              name="nit"
              value={formData.nit}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="NIT"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nombre de la sucursal"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Razón Social</label>
            <input
              type="text"
              name="razon_social"
              value={formData.razon_social}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Razón Social"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Dirección"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SucursalModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedSucursal: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default SucursalModal;
