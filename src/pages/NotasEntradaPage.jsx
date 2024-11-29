import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotasEntrada, crearNotaEntrada } from '../reducers/notaEntradaSlice';
import { fetchProveedores } from '../reducers/proveedorSlice';
import { fetchProductos } from '../reducers/productoSlice';
import NotaEntradaForm from '../components/NotaEntradaModal'; // Importar el modal
import { useParams } from 'react-router-dom';

const NotaEntradaPage = () => {
  const dispatch = useDispatch();
  const { idAlmacen } = useParams(); // Obtenemos el ID del almacén desde los parámetros

  const notasEntrada = useSelector((state) =>
    (state.notasEntrada.notasEntrada || []).filter(nota => nota.almacen.id === Number(idAlmacen))
  );
  const loadingNotas = useSelector((state) => state.notasEntrada.loading);
  const proveedores = useSelector((state) => state.proveedores.proveedores);
  const productos = useSelector((state) => state.productos.productos);

  const [expandedRows, setExpandedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cambia este valor según cuántos elementos por página deseas mostrar

  const totalPages = Math.ceil(notasEntrada.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchNotasEntrada());
    dispatch(fetchProveedores());
    dispatch(fetchProductos());
  }, [dispatch]);

  const toggleRow = (notaId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(notaId)
        ? prevExpandedRows.filter((id) => id !== notaId)
        : [...prevExpandedRows, notaId]
    );
  };

  const handleCreateNota = (formData) => {
    return dispatch(crearNotaEntrada(formData))
      .then(() => {
        setIsModalOpen(false); // Cerrar el modal después de guardar
      })
      .catch((error) => {
        console.error('Error al crear la nota de entrada:', error);
      });
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Calcular elementos visibles según la página actual
  const visibleNotas = notasEntrada.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Notas de Entrada - Almacén {idAlmacen}
      </h1>

      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Crear Nota de Entrada
      </button>

      {/* Modal para registrar nueva nota de entrada */}
      {isModalOpen && (
        <NotaEntradaForm
          almacenId={idAlmacen}
          proveedores={proveedores}
          productos={productos}
          onSubmit={handleCreateNota}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Tabla de notas de entrada */}
      {loadingNotas ? (
        <p className="text-center">Cargando notas...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200 shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left border-b">ID</th>
                <th className="py-3 px-6 text-left border-b">Proveedor</th>
                <th className="py-3 px-6 text-left border-b">Fecha</th>
                <th className="py-3 px-6 text-left border-b">Total</th>
                <th className="py-3 px-6 text-left border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibleNotas.map((nota) => (
                <React.Fragment key={nota.id}>
                  <tr className="hover:bg-gray-100 transition-colors">
                    <td className="py-3 px-6 border-b">{nota.id}</td>
                    <td className="py-3 px-6 border-b">
                      {nota.proveedor.nombre}
                    </td>
                    <td className="py-3 px-6 border-b">
                      {new Date(nota.fecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-6 border-b">{nota.total}</td>
                    <td className="py-3 px-6 border-b">
                      <button
                        onClick={() => toggleRow(nota.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        {expandedRows.includes(nota.id) ? 'Ocultar' : 'Ver Detalles'}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(nota.id) && (
                    <tr>
                      <td colSpan="5" className="p-4 bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">
                          Detalles de la Nota {nota.id}
                        </h3>
                        <ul className="list-disc pl-6">
                          {nota.detalleNotaEntrada.map((detalle) => (
                            <li key={detalle.id} className="mb-1">
                              <strong>Producto:</strong> {detalle.producto.nombre} <br />
                              <strong>Cantidad:</strong> {detalle.cantidad} <br />
                              <strong>Costo Unitario:</strong> {detalle.costoUnitario.toFixed(2)} <br />
                              <strong>Subtotal:</strong> {detalle.subTotal.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default NotaEntradaPage;
