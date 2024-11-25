import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { PhotoIcon } from "@heroicons/react/24/solid";

const ProductoModal = ({
  open,
  onClose,
  selectedProduct,
  onSave,
  isEditing,
  categorias,
}) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    id_categoria: "",
    foto: "",
    precioCompra: "", // Agregar precio de compra
    precioVenta: "", // Agregar precio de venta
  });

  const {
    codigo,
    nombre,
    descripcion,
    id_categoria,
    foto,
    precioCompra,
    precioVenta,
  } = formData;

  useEffect(() => {
    if (isEditing && selectedProduct) {
      setFormData({
        codigo: selectedProduct.codigo || "",
        nombre: selectedProduct.nombre || "",
        descripcion: selectedProduct.descripcion || "",
        id_categoria: selectedProduct.categoria?.id || "",
        foto: selectedProduct.foto || "",
        precioCompra: selectedProduct.precioCompra || "", // Cargar precio de compra
        precioVenta: selectedProduct.precioVenta || "", // Cargar precio de venta
      });
    } else {
      setFormData({
        codigo: "",
        nombre: "",
        descripcion: "",
        id_categoria: "",
        foto: "",
        precioCompra: "", // Resetear precio de compra
        precioVenta: "", // Resetear precio de venta
      });
    }
  }, [isEditing, selectedProduct, open]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formDataImage = new FormData();
      formDataImage.append("file", file);
      formDataImage.append("upload_preset", "ecommerce_si");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ds7majeoq/image/upload",
          { method: "POST", body: formDataImage }
        );
        const data = await response.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          foto: data.secure_url,
        }));
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    multiple: false,
    onDrop: handleDrop,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: selectedProduct?.id });
  };

  function handleBlur(e) {
    const { name, value } = e.target;
    const formattedValue = parseFloat(value).toFixed(2); // Formatea a dos decimales
    onChange({ target: { name, value: formattedValue } });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl mb-4">
          {isEditing ? "Editar Producto" : "Crear Producto"}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Campo para el código */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Código
            </label>
            <input
              type="text"
              name="codigo"
              value={codigo}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Código del producto"
              required
            />
          </div>

          {/* Campo para el nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nombre del producto"
              required
            />
          </div>

          {/* Campo para la descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={descripcion}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Descripción del producto"
              required
            />
          </div>

          {/* Campo para la categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              name="id_categoria"
              value={id_categoria}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Selecciona una categoría</option>
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay categorías disponibles</option>
              )}
            </select>
          </div>

          {/* Campo para el precio de compra */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Costo
            </label>
            <input
              type="number"
              name="precioCompra"
              value={precioCompra}
              onChange={onChange}
              onBlur={handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Costo del producto"
              min="0.00"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio de venta
            </label>
            <input
              type="number"
              name="precioVenta"
              value={precioVenta}
              onChange={onChange}
              onBlur={handleBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Precio de venta del producto"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          {/* Campo para subir imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Imagen del producto
            </label>
            <div
              {...getRootProps()}
              className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 p-4"
            >
              <input {...getInputProps()} />
              <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Arrastra y suelta o selecciona una imagen
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF hasta 10MB
                </p>
              </div>
            </div>
            {foto && (
              <div className="mt-4">
                <img
                  src={foto}
                  alt="Imagen del producto"
                  className="w-full h-24 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  categorias: PropTypes.array.isRequired,
};

export default ProductoModal;
