import React from "react";
import PropTypes from "prop-types";

const ProductoDeleteModal = ({ open, onClose, selectedProduct, onDelete }) => {
  if (!open) return null;  // Si el modal no está abierto, no se renderiza nada

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p
          className="text-right cursor-pointer text-gray-500"
          onClick={onClose}
        >
          X
        </p>
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            ¿Estás seguro de eliminar el producto{" "}
            <span className="font-bold">{selectedProduct?.nombre}</span>?
          </h3>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md"
            onClick={() => onDelete(selectedProduct.id)}  // Llama a onDelete con el ID del producto
          >
            Eliminar
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg shadow-md"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

ProductoDeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,  // Indica si el modal está abierto
  onClose: PropTypes.func.isRequired,  // Función para cerrar el modal
  selectedProduct: PropTypes.object,  // El producto seleccionado para eliminar
  onDelete: PropTypes.func.isRequired,  // Función para confirmar la eliminación
};

export default ProductoDeleteModal;
