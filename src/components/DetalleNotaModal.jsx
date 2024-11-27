import React from "react";

const DetallesNotaModal = ({ nota, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-w-4xl">
        <button
          className="absolute top-4 right-4 text-red-500 font-bold"
          onClick={onClose}
        >
          Cerrar
        </button>
        <h2 className="text-xl font-bold mb-4">
          Detalles de la Nota: {nota.id}
        </h2>

        <div className="mb-4">
          <p><strong>Fecha:</strong> {nota.fecha}</p>
          <p><strong>Proveedor:</strong> {nota.proveedor}</p>
          <p><strong>Monto Total:</strong> ${nota.montoTotal}</p>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Producto</th>
              <th className="border border-gray-300 px-4 py-2">Cantidad</th>
              <th className="border border-gray-300 px-4 py-2">Costo Unitario</th>
              <th className="border border-gray-300 px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {nota.detalles.map((detalle, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {detalle.producto}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {detalle.cantidad}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${detalle.costoUnitario}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${detalle.subtotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right">
          <p className="text-lg font-bold">Total: ${nota.montoTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default DetallesNotaModal;
