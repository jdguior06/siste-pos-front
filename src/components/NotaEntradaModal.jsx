import React, { useState, useEffect } from "react";

const NotaEntradaForm = ({ almacenes, proveedores, onSubmit }) => {
  const [formData, setFormData] = useState({
    almacen: 1,  // ID del almacén por defecto
    fecha: "",
    proveedor: "",
    descuento: 0,
    detalles: [
      { productoId: "", cantidad: 0, costoUnitario: 0 },
    ],
  });

  // Estado para almacenar los datos calculados (subtotal y total) obtenidos del backend
  const [totales, setTotales] = useState({ subtotal: 0, total: 0 });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "almacen" || name === "proveedor" || name === "descuento" || name === "fecha") {
      setFormData({ ...formData, [name]: value });
    } else {
      // Actualizar detalles de productos
      const newDetalles = [...formData.detalles];
      newDetalles[index][name] = value;
      setFormData({ ...formData, detalles: newDetalles });
    }
  };

  const addDetalle = () => {
    setFormData({
      ...formData,
      detalles: [...formData.detalles, { productoId: "", cantidad: 0, costoUnitario: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setTotales); // Llamar a la función de submit y actualizar los totales
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Nota de Compra</h2>

      <div>
        <label>Almacén</label>
        <input
          type="number"
          name="almacen"
          value={formData.almacen}
          disabled
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>Proveedor</label>
        <select
          name="proveedor"
          value={formData.proveedor}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Seleccione un proveedor</option>
          {proveedores.map((prov) => (
            <option key={prov.id} value={prov.id}>{prov.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      <h3 className="text-lg font-semibold">Detalles</h3>

      {formData.detalles.map((detalle, index) => (
        <div key={index} className="grid grid-cols-4 gap-4">
          <select
            name="productoId"
            value={detalle.productoId}
            onChange={(e) => handleInputChange(e, index)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Seleccione un producto</option>
            {/* Suponiendo que tienes un array de productos */}
            {/* productos.map((prod) => (
              <option key={prod.id} value={prod.id}>{prod.nombre}</option>
            )) */}
          </select>
          <input
            type="number"
            name="cantidad"
            value={detalle.cantidad}
            onChange={(e) => handleInputChange(e, index)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="number"
            name="costoUnitario"
            value={detalle.costoUnitario}
            onChange={(e) => handleInputChange(e, index)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
      ))}
      
      <button
        type="button"
        onClick={addDetalle}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Añadir Producto
      </button>

      <div>
        <label>Descuento</label>
        <input
          type="number"
          name="descuento"
          value={formData.descuento}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mt-4">
        <label>Subtotal</label>
        <input
          type="text"
          value={totales.subtotal}
          readOnly
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>Total</label>
        <input
          type="text"
          value={totales.total}
          readOnly
          className="border p-2 rounded w-full"
        />
      </div>

      <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">
        Guardar Nota de Entrada
      </button>
    </form>
  );
};

export default NotaEntradaForm;
