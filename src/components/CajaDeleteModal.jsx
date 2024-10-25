import React from "react";
import PropTypes from "prop-types";

const CajaDeleteModal = ({ open, onClose, selectedCaja, onDelete }) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-right cursor-pointer text-gray-500" onClick={onClose}>
          X
        </p>
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            ¿Estás seguro de eliminar la caja{" "}
            <span className="font-bold">{selectedCaja?.caja}</span>?
          </h3>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            onClick={() => onDelete(selectedCaja.id)} // Llamamos a onDelete con el ID
          >
            Eliminar
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

CajaDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedCaja: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
};

export default CajaDeleteModal;

