import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotasEntrada, crearNotaEntrada } from '../reducers/notaEntradaSlice';
import { fetchDetallesNota } from '../reducers/detalleNotaSlice';
import NotaEntradaForm from '../components/NotaEntradaModal';

const NotaEntradaPage = () => {
  const dispatch = useDispatch();
  
  // Estado de Redux
  const notasEntrada = useSelector((state) => state.notasEntrada.notasEntrada || []);
  const loadingNotas = useSelector((state) => state.notasEntrada.loading);
  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    dispatch(fetchNotasEntrada());
  }, [dispatch]);

  // Manejo de la creación de una nueva nota de entrada
  const handleCreateNota = (formData, setTotales) => {
    dispatch(crearNotaEntrada(formData))
      .then((response) => {
        // Aquí puedes calcular y actualizar los totales si el backend lo devuelve
        setTotales({ subtotal: response.subtotal, total: response.total });
      })
      .catch((error) => {
        console.error("Error al crear la nota de entrada:", error);
      });
  };

  return (
    <div>
      <h1>Nota de Entrada</h1>
      <button onClick={() => setIsModalOpen(true)} className="p-2 bg-blue-500 text-white rounded">
        Crear Nota de Entrada
      </button>

      {/* Modal para crear nueva nota de entrada */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <NotaEntradaForm
              almacenes={[]}  // Pasa aquí los datos de almacenes desde Redux o un array con datos
              proveedores={[]} // Pasa aquí los datos de proveedores desde Redux o un array con datos
              onSubmit={handleCreateNota}
            />
            <button onClick={() => setIsModalOpen(false)} className="mt-4 p-2 bg-red-500 text-white rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Mostrar Notas de Entrada */}
      {loadingNotas ? (
        <p>Cargando notas...</p>
      ) : (
        <div>
          {notasEntrada.map((nota) => (
            <div key={nota.id}>
              <p>Nota ID: {nota.id}</p>
              <p>Proveedor ID: {nota.proveedorId}</p>
              <p>Almacén ID: {nota.almacenId}</p>
              <p>Total: {nota.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotaEntradaPage;
