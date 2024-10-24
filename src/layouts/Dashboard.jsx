import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = ({ selectedSucursal }) => {
  console.log('Sucursal seleccionada en Dashboard:', selectedSucursal);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedSucursal={selectedSucursal}
        />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Outlet /> {/* Aquí se renderizan las páginas dentro del layout */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
