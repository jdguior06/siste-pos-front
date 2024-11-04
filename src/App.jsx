import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductosPage from "./pages/ProductosPage";
import CategoriasPage from "./pages/CategoriasPage";
import ClientesPage from "./pages/ClientesPage";
import ProveedoresPage from "./pages/ProveedoresPage";
import SucursalesPage from "./pages/SucursalesPage";
import SucursalPanel from "./pages/SucursalPanel";
import AlmacenesPage from "./pages/AlmacenesPage";
import CajasPage from "./pages/CajasPage";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./layouts/Dashboard";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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


  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<Feature />} />
            <Route path="/precio" element={<Pricing />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Route>

          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Dashboard selectedSucursal={selectedSucursal} />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/proveedores" element={<ProveedoresPage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/permisos" element={<PermisosPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/configuraciones" element={<ThemeSettings />} />
              <Route
                path="/sucursales"
                element={
                  <SucursalesPage setSelectedSucursal={setSelectedSucursal} />
                }
              />

              {/* Ruta de panel para cada sucursal */}
              <Route
                path="/sucursales/:id/panel"
                element={<SucursalPanel selectedSucursal={selectedSucursal} />}
              >
                {/* Ruta anidada para almacenes */}
                <Route index element={<Navigate to="almacenes" replace />} />
                <Route path="almacenes" element={<AlmacenesPage />} />
                <Route path="cajas" element={<CajasPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
