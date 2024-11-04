// src/components/UsuarioModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUsuario, updateUsuario } from '../reducers/usuarioSlice';

const UsuarioModal = ({ isOpen, onClose, user, roles }) => {
  const dispatch = useDispatch();

  // Inicializa los campos del formulario
  const [nombre, setNombre] = useState(user ? user.nombre : "");
  const [apellido, setApellido] = useState(user ? user.apellido : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [activo, setActivo] = useState(user ? user.activo : true);
  const [rolId, setRolId] = useState(user ? user.rol?.id || "" : "");

  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setApellido(user.apellido);
      setEmail(user.email);
      setActivo(user.activo);
      setRolId(user.rol?.id || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioData = { nombre, apellido, email, password, activo, rolId };

    if (user) {
      dispatch(updateUsuario({ id: user.id, usuario: usuarioData }));
    } else {
      dispatch(addUsuario(usuarioData));
    }

    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">{user ? "Editar Usuario" : "Crear Nuevo Usuario"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          {!user && (
            <div className="mb-4">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Rol</label>
            <select
              value={rolId}
              onChange={(e) => setRolId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Seleccionar Rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 rounded bg-gray-400 text-white">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">{user ? "Actualizar" : "Crear"}</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UsuarioModal;
