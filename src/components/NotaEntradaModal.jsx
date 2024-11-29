import React, { useState, useEffect } from "react";

const NotaEntradaForm = ({ almacenId, proveedores = [], productos = [], onSubmit }) => {
  const [formData, setFormData] = useState({
    almacen: almacenId || "",
    fecha: "",
    proveedor: "",
    descuento: "0", // Cambiado a string para permitir ingreso parcial
    detalles: [{ productoId: "", cantidad: "0", costoUnitario: "0" }], // Valores como strings
  });

  const [totales, setTotales] = useState({ subtotal: 0, total: 0 });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      almacen: almacenId || "",
    }));
  }, [almacenId]);

  // Calcular subtotal y total cada vez que cambian los detalles
  useEffect(() => {
    let subtotal = 0;
    formData.detalles.forEach((detalle) => {
      subtotal += parseFloat(detalle.cantidad) * parseFloat(detalle.costoUnitario) || 0;
    });

    // Aplicar descuento y calcular total
    const descuento = parseFloat(formData.descuento) || 0;
    const total = subtotal - (subtotal * descuento / 100);

    setTotales({ subtotal, total });
  }, [formData.detalles, formData.descuento]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (["proveedor", "descuento", "fecha"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Mantener como string
      }));
    } else {
      const newDetalles = [...formData.detalles];
      newDetalles[index][name] = value; // Mantener como string
      setFormData((prev) => ({ ...prev, detalles: newDetalles }));
    }
  };

  const addDetalle = () => {
    setFormData((prev) => ({
      ...prev,
      detalles: [...prev.detalles, { productoId: "", cantidad: "0", costoUnitario: "0" }],
    }));
  };

  const removeDetalle = (index) => {
    const newDetalles = [...formData.detalles];
    newDetalles.splice(index, 1);
    setFormData((prev) => ({ ...prev, detalles: newDetalles }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Agregar hora a la fecha (por defecto a las 00:00:00)
    const fechaConHora = formData.fecha + "T00:00:00"; // Formato adecuado para LocalDateTime
    
    // Convertir valores antes de enviar al backend
    const formattedData = {
      ...formData,
      fecha: fechaConHora, // Ajustamos la fecha con la hora incluida
      descuento: parseFloat(formData.descuento) || 0,
      detalles: formData.detalles.map((detalle) => ({
        ...detalle,
        cantidad: parseFloat(detalle.cantidad) || 0,
        costoUnitario: parseFloat(detalle.costoUnitario) || 0,
      })),
    };

    onSubmit(formattedData, setTotales);
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
            <option key={prov.id} value={prov.id}>
              {prov.nombre}
            </option>
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
        <div key={index} className="grid grid-cols-4 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700">Producto</label>
            <select
              name="productoId"
              value={detalle.productoId}
              onChange={(e) => handleInputChange(e, index)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={detalle.cantidad}
              onChange={(e) => handleInputChange(e, index)}
              className="border p-2 rounded w-full"
              placeholder="Ingrese cantidad"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Costo Unitario</label>
            <input
              type="number"
              name="costoUnitario"
              value={detalle.costoUnitario}
              onChange={(e) => handleInputChange(e, index)}
              className="border p-2 rounded w-full"
              placeholder="Ingrese costo unitario"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => removeDetalle(index)}
            className="mt-2 p-2 bg-red-500 text-white rounded"
          >
            Eliminar Producto
          </button>
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

      <div>
        <label>Subtotal</label>
        <input type="text" value={totales.subtotal} readOnly className="border p-2 rounded w-full" />
      </div>

      <div>
        <label>Total</label>
        <input type="text" value={totales.total} readOnly className="border p-2 rounded w-full" />
      </div>

      <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">
        Guardar Nota de Entrada
      </button>
    </form>
  );
};

export default NotaEntradaForm;