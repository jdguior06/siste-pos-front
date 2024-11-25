import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


const CajaModal = ({ open, onClose, selectedCaja, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    nombre: "",
  });

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditing && selectedCaja) {
      setFormData({
        nombre: selectedCaja.nombre || "",
      });
    } else if (!isEditing) {
      setFormData({
        nombre: "",
      });
    }
  }, [isEditing, selectedCaja, open]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: selectedCaja?.id });
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
            {isEditing ? "Editar caja" : "Crear caja"}
          </h3>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
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

CajaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedCaja: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default CajaModal;

