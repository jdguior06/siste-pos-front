import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotasEntrada, crearNotaEntrada } from '../reducers/notaEntradaSlice';
import { fetchAlmacenes } from '../reducers/almacenSlice';
import { fetchProveedores } from '../reducers/proveedorSlice';
import NotaEntradaForm from '../components/NotaEntradaModal';
import { fetchProductos } from '../reducers/productoSlice';
import { useParams } from 'react-router-dom'; // Para acceder a los parámetros de la URL


const NotaEntradaPage = () => {
  const dispatch = useDispatch();
  const { id, idAlmacen } = useParams(); // Extrae idSucursal e idAlmacen de la URL
  

  console.log("ID de Sucursal:", id);
  console.log("ID de Almacén:", idAlmacen)

  const notasEntrada = useSelector((state) =>
    (state.notasEntrada.notasEntrada || []).filter(nota => nota.almacenId === Number(idAlmacen))
  );  // Filtra notas de entrada por idAlmacen

  // Estado de Redux
 
  const loadingNotas = useSelector((state) => state.notasEntrada.loading);
  const productos = useSelector((state) => state.productos.productos); // Obtener productos desde Redux
  const almacenes = useSelector((state) => state.almacenes.almacenes); 
  const proveedores = useSelector((state) => state.proveedores.proveedores);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Cargar datos iniciales
  useEffect(() => {
    dispatch(fetchNotasEntrada());
    dispatch(fetchProductos()); // Cargar productos desde Redux
    dispatch(fetchAlmacenes()); // Cargar almacenes desde Redux
    dispatch(fetchProveedores()); // Cargar proveedores desde Redux
  }, [dispatch]);

  // Confirma si las notas de entrada están filtradas correctamente
  console.log("Notas filtradas por Almacén:", notasEntrada);

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
          {console.log("Almacén seleccionado:", idAlmacen)}
            <NotaEntradaForm
              almacenId={idAlmacen}  // Pasa almacenId extraído de la URL al formulario
              productos={productos}
              almacenes={almacenes} 
              proveedores={proveedores} 
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
          ))
          }
        </div>
      )}
    </div>
  );
};

export default NotaEntradaPage;
