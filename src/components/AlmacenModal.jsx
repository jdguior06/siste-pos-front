import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AlmacenModal = ({ open, onClose, selectedAlmacen, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    numero: "",
    descripcion: "",
    activo: true,
  });

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditing && selectedAlmacen) {
      setFormData({
        numero: selectedAlmacen.numero || "",
        descripcion: selectedAlmacen.descripcion || "",
        // activo: selectedAlmacen.activo || false,
      });
    } else if (!isEditing) {
      setFormData({
        numero: "",
        descripcion: "",
        // activo: true,
      });
    }
  }, [isEditing, selectedAlmacen, open]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: selectedAlmacen?.id });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-right cursor-pointer text-gray-500" onClick={onClose}>
          X
        </p>
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {isEditing ? "Editar Almacén" : "Crear Almacén"}
          </h3>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Número</label>
            <input
              type="number"
              name="numero"
              value={formData.numero}
              onChange={onChange}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={onChange}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={onChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">Activo</label>
          </div> */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AlmacenModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedAlmacen: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AlmacenModal;
