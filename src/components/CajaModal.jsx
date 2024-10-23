import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//import { fetchSucursales } from "../reducers/sucursalSlice";

const CajaModal = ({ open, onClose, selectedCaja, onSave, isEditing,sucursales }) => {
    // Estado local para los datos de la caja (nombre, sucursal)
    const [formData, setFormData] = useState({
        nombre: "",
        
        id_sucursal: "",
    });

    console.log('Current state value:', sucursales);

    const {  nombre, id_sucursal } = formData;




    // Cada vez que el modal se abre y tiene una caja seleccionada, cargamos los datos de esa caja en el estado
    useEffect(() => {
        if (isEditing && selectedCaja) {
            setFormData({
                nombre: selectedCaja.nombre || "",
                id_sucursal: selectedCaja.sucursal?.id || "",
               // id_categoria: selectedProduct.categoria?.id || "", 
            });
        } else {
            // Si no estamos editando, limpiamos el formulario
            setFormData({
                nombre: "",
                id_sucursal: "",
            });
        }
    }, [isEditing, selectedCaja]);




    // Manejador para actualizar el estado del formulario en cada cambio de input
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envío del formulario
    const onSubmit = (e) => {
        e.preventDefault();
        // Llamamos a la función `onSave` pasándole los datos de la caja, y cerramos el modal
        onSave({ ...formData, id: selectedCaja?.id });  // Incluimos el `id` si estamos en modo edición
    };




    if (!open) return null;  // Si el modal no está abierto, no renderizamos nada

    return (
        <div className="overlay fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="modalContainer bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <h3 className="text-2xl mb-4">
                    {isEditing ? "Editar Caja" : "Crear Caja"}
                </h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={onChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Sucursal
                        </label>
                        <select
                            name="id_sucursal"
                            value={id_sucursal}
                            onChange={onChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        >
                            <option value=""> Seleccione una sucursal</option>
                          
                            {sucursales.length> 0 ?(
                               //console.log(sucursales),
                               sucursales.map((sucursal) => (
                                <option key={sucursal.id} value={sucursal.id}>
                                    {sucursal.nombre}
                                </option>
                            ))
                        ):( <option disabled> No hay sucursales disponibles</option>)}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}  // Cierra el modal al hacer clic en "Cancelar"
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

CajaModal.propTypes = {
    open: PropTypes.bool.isRequired,  // Indica si el modal está abierto
    onClose: PropTypes.func.isRequired,  // Función para cerrar el modal
    selectedCaja: PropTypes.object,  // Caja seleccionada para editar (puede ser null)
    onSave: PropTypes.func.isRequired,  // Función para guardar la caja (crear/editar)
    isEditing: PropTypes.bool.isRequired,  // Indica si estamos en modo edición
    sucursales: PropTypes.array.isRequired,  // Lista de sucursales para el select
};

export default CajaModal;