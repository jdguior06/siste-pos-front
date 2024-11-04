// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import PlanPage from "./pages/CatalogoPlanes";
import ProductosPage from "./pages/ProductosPage";
import CategoriasPage from "./pages/CategoriasPage";
import ClientesPage from "./pages/ClientesPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import SucursalesPage from "./pages/SucursalesPage";
import SucursalPanel from "./pages/SucursalPanel";
import AlmacenesPage from "./pages/AlmacenesPage";
import CajasPage from "./pages/CajasPage";
import Login from "./pages/Login";
import Registro from "./pages/Registro";  // Importar la página de Registro
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./layouts/Dashboard";
import Navbar1 from "./components/Navbar1";  // Navbar para Home, Login y PlanPage
import { useDispatch } from "react-redux";
import { clearAuth, setAuth } from "./reducers/authSlice";
import PermisosPage from "./pages/PermisosPage";
import RolesPage from "./pages/RolesPage";
import UsuariosPage from "./pages/UsuariosPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Feature from "./pages/Feature";
import Pricing from "./components/Pricing";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSettings from "./pages/ThemeSettings";
import api from './utils/api';
import InventarioPage from "./pages/InventarioPage";
import NotasEntradaPage from "./pages/NotasEntradaPage";
import ReportePage from "./pages/ReportePage";

function App() {
  const dispatch = useDispatch();
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("auth"));
        
        if (authData?.token) {
          dispatch(setAuth(authData));  
          
          // Verifica el token con el backend
          const response = await api.get('/auth/me');
          if (response.data) {
            dispatch(setAuth(response.data)); 
          }
        } else {
          dispatch(clearAuth()); 
        }
      } catch (error) {
        dispatch(clearAuth()); // Limpia el estado si hay error (token expirado)
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  const NavbarLayout = () => (
    <>
      <Navbar1 />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );

  return (
    <ThemeProvider>
      <Router>
      <Routes>
        {/* Rutas donde se muestra Navbar1 */}
        <Route element={<NavbarLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/planes" element={<PlanPage />} />
          <Route path="/registro" element={<Registro />} /> {/* Nueva ruta de Registro */}
        </Route>

        {/* Otras rutas con el Navbar diferente o sin Navbar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard selectedSucursal={selectedSucursal} />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/proveedores" element={<ProveedoresPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/reportes" element={<ReportePage />} />
            <Route path="/sucursales" element={<SucursalesPage setSelectedSucursal={setSelectedSucursal} />} />
            <Route path="/sucursales/:id/panel" element={<SucursalPanel selectedSucursal={selectedSucursal} />}>
              <Route index element={<Navigate to="almacenes" replace />} />
              <Route path="almacenes" element={<AlmacenesPage />} />
              <Route path="cajas" element={<CajasPage />} />
              {/* Ruta de inventario y notas de entrada dentro del almacén seleccionado */}
              <Route path="/sucursales/:id/panel/almacenes/:idAlmacen" element={<InventarioPage />} />
<              Route path="/sucursales/:id/panel/almacenes/:idAlmacen/notas-entrada" element={<NotasEntradaPage />} />

            </Route>
          </Route>
        </Route>
        {/* Ruta para cualquier otro acceso a rutas inválidas */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
