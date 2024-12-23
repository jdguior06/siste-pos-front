import { useState, useEffect } from "react";

const NotaEntradaForm = ({ almacenId, proveedores, productos, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    almacen: almacenId || "",
    proveedor: "",
    detalles: [{ productoId: "", cantidad: 0, precio: 0, subtotal: 0 }],
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      almacen: almacenId || "",
    }));
  }, [almacenId]);

  useEffect(() => {
    const newTotal = formData.detalles.reduce(
      (acc, detalle) => acc + parseFloat(detalle.subtotal || 0),
      0
    );
    setTotal(newTotal);
  }, [formData.detalles]);

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index === null) {
      setFormData({ ...formData, [name]: value });
    } else {
      const newDetalles = [...formData.detalles];
      newDetalles[index][name] = value;

      if (name === "cantidad" || name === "productoId") {
        const productoSeleccionado = productos.find(
          (prod) => prod.id === parseInt(newDetalles[index].productoId)
        );

        if (productoSeleccionado) {
          const cantidad = parseFloat(newDetalles[index].cantidad || 0);
          newDetalles[index].precio = productoSeleccionado.precioCompra;
          newDetalles[index].subtotal =
            productoSeleccionado.precioCompra * cantidad || 0;
        } else {
          newDetalles[index].precio = 0;
          newDetalles[index].subtotal = 0;
        }
      }

      setFormData({ ...formData, detalles: newDetalles });
    }
  };

  const addDetalle = () => {
    setFormData({
      ...formData,
      detalles: [
        ...formData.detalles,
        { productoId: "", cantidad: 0, precio: 0, subtotal: 0 },
      ],
    });
  };

  const removeDetalle = (index) => {
    const newDetalles = [...formData.detalles];
    newDetalles.splice(index, 1);
    setFormData({ ...formData, detalles: newDetalles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.proveedor) {
      alert("Debe seleccionar un proveedor.");
      return;
    }

    if (
      formData.detalles.some(
        (detalle) => !detalle.productoId || detalle.cantidad <= 0
      )
    ) {
      alert("Todos los productos deben tener una cantidad válida.");
      return;
    }

    try {
      const submitResult = onSubmit(formData); // onSubmit podría no retornar nada.
      if (submitResult && typeof submitResult.then === "function") {
        // Solo manejar si es una Promise
        submitResult
          .then(() => onClose())
          .catch((error) => {
            console.error("Error al guardar la nota de entrada:", error);
          });
      } else {
        // Si no es una Promise, simplemente cerrar el modal
        onClose();
      }
    } catch (error) {
      console.error("Error al ejecutar onSubmit:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-700">Registrar Nota de Entrada</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Almacén</label>
            <input
              type="text"
              name="almacen"
              value={formData.almacen}
              disabled
              className="border p-2 rounded w-full bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Proveedor</label>
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

          <h3 className="text-lg font-semibold text-gray-700">Detalles</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-center font-bold text-gray-700">
              <div className="col-span-4">Producto</div>
              <div className="col-span-2">Precio</div>
              <div className="col-span-2">Cantidad</div>
              <div className="col-span-3">Subtotal</div>
              <div className="col-span-1"></div>
            </div>

            {formData.detalles.map((detalle, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4">
                  <select
                    name="productoId"
                    value={detalle.productoId}
                    onChange={(e) => handleInputChange(e, index)}
                    className="border p-2 rounded w-full"
                    required
                  >
                    <option value="">Seleccione producto</option>
                    {productos.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    value={detalle.precio.toFixed(2)}
                    readOnly
                    className="border p-2 rounded w-full bg-gray-200"
                    placeholder="Precio"
                  />
                </div>

                <div className="col-span-2">
                  <input
                    type="number"
                    name="cantidad"
                    value={detalle.cantidad}
                    onChange={(e) => handleInputChange(e, index)}
                    className="border p-2 rounded w-full"
                    placeholder="Cantidad"
                    min="1"
                    required
                  />
                </div>

                <div className="col-span-3">
                  <input
                    type="text"
                    value={detalle.subtotal.toFixed(2)}
                    readOnly
                    className="border p-2 rounded w-full bg-gray-200"
                    placeholder="Subtotal"
                  />
                </div>

                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => removeDetalle(index)}
                    className="bg-red-500 text-white p-2 rounded w-full"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addDetalle}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Añadir Producto
          </button>

          <div className="mt-6">
            <label className="block text-lg font-medium text-gray-700">Total</label>
            <input
              type="text"
              value={total.toFixed(2)}
              readOnly
              className="border p-2 rounded w-full bg-gray-200 text-lg font-semibold"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotaEntradaForm;