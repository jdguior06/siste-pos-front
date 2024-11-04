import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-lg sticky top-0 z-10">
      <div className="text-2xl font-bold text-gray-800">TuLogo</div>
      <nav className="space-x-6 text-lg">
        <Link to="/" className="text-gray-700 hover:text-gray-900">Aplicaciones</Link>
        <Link to="/" className="text-gray-700 hover:text-gray-900">Sectores</Link>
        <Link to="/" className="text-gray-700 hover:text-gray-900">Community</Link>
        <Link to="/precio" className="text-gray-700 hover:text-gray-900">Precios</Link>
        <Link to="/" className="text-gray-700 hover:text-gray-900">Contacto</Link>
        <Link to="/login" className="text-gray-700 hover:text-gray-900">Iniciar sesión</Link>
        <Link to="/signup" className="bg-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors">
          Pruébalo gratis
        </Link>
      </nav>
    </header>
  );
};

export default Header;

