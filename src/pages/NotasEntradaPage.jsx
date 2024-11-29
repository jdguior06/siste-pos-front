import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotasEntrada, crearNotaEntrada,fetchNotasBySucursalAlmacen } from '../reducers/notaEntradaSlice';
import { fetchAlmacenes } from '../reducers/almacenSlice';
import { fetchProveedores } from '../reducers/proveedorSlice';
import NotaEntradaForm from '../components/NotaEntradaModal';
import DetallesNotaModal from '../components/DetalleNotaModal';
import { fetchProductos } from '../reducers/productoSlice';
import { useParams } from 'react-router-dom'; // Para acceder a los parámetros de la URL


const NotaEntradaPage = () => {
  const dispatch = useDispatch();
  const { id: idSucursal, idAlmacen } = useParams(); // Extrae idSucursal e idAlmacen de la URL
  
  // Estado de Redux
  const notasEntrada = useSelector((state) => state.notasEntrada.notasEntrada || []);
   const loadingNotas = useSelector((state) => state.notasEntrada.loading);
  const productos = useSelector((state) => state.productos.productos); // Obtener productos desde Redux
  const almacenes = useSelector((state) => state.almacenes.almacenes); 
  const proveedores = useSelector((state) => state.proveedores.proveedores);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null); // Estado para la nota seleccionada

 
  useEffect(() => {
    if (idSucursal && idAlmacen) {
      console.log("ID de Sucursal:", idSucursal);
      console.log("ID de Almacén:", idAlmacen);


      dispatch(fetchNotasBySucursalAlmacen({ idSucursal, idAlmacen })); 
      dispatch(fetchProductos());
      dispatch(fetchAlmacenes(idSucursal));
      dispatch(fetchProveedores());
    } else {
      console.error("ID o ID de Almacén no están definidos");
    }
  }, [dispatch, idSucursal, idAlmacen]);
  console.log("Notas filtradas por Almacén:", notasEntrada);

  // Manejo de la creación de una nueva nota de entrada
  const handleCreateNota = (formData, setTotales) => {
    dispatch(crearNotaEntrada(formData))
      .then((response) => {
        // Aquí puedes calcular y actualizar los totales si el backend lo devuelve
        setTotales({ subtotal: response.subtotal, total: response.total });
        dispatch(fetchNotasBySucursalAlmacen({ idSucursal, idAlmacen }));
        console.log("Nota de entrada creada:", response.payload);
      })
      .catch((error) => {
        console.error("Error al crear la nota de entrada:", error);
      });
  };
  const handleRowClick = (nota) => {
    setSelectedNota(nota); // Abrir modal con la nota seleccionada
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
              almacenId={idAlmacen}
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
          {notasEntrada.length > 0 ? (
            notasEntrada.map((nota) => (
              <div
                key={nota.id}
                className="p-4 border border-gray-300 rounded mb-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(nota)}
              >
                <p><strong>Nota ID:</strong> {nota.id}</p>
                <p><strong>Proveedor:</strong> {nota.proveedorId}</p>
                <p><strong>Almacén:</strong> {nota.almacenId}</p>
                <p><strong>Total:</strong> ${nota.total}</p>
              </div>
            ))
          ) : (
            <p>No hay notas disponibles para este almacén.</p>
          )}
        </div>
      )}
      {/* Modal para detalles de nota */}
      {selectedNota && (
        <DetallesNotaModal
          nota={selectedNota}
          onClose={() => setSelectedNota(null)} // Cerrar modal
        />
      )}
    </div>
  );
};

export default NotaEntradaPage;