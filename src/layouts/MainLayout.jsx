import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <Outlet /> {/* Aquí se renderizan las páginas dentro del layout */}
        </main>
      <Footer />
    </>
  );
};

export default MainLayout;
