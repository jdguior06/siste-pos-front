// src/components/Footer.js
import React from "react";
import { 
  GlobeAltIcon, 
  PhoneIcon, 
  ChatBubbleBottomCenterTextIcon, 
  EnvelopeIcon, 
  BuildingOfficeIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sección Comunidad */}
        <div>
          <h3 className="text-white font-semibold mb-4">Comunidad</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Tutoriales</a></li>
            <li><a href="/" className="hover:underline">Documentación</a></li>
            <li><a href="/" className="hover:underline">Foro</a></li>
          </ul>
        </div>

        {/* Sección Servicios */}
        <div>
          <h3 className="text-white font-semibold mb-4">Servicios</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Alojamiento en Odoo.sh</a></li>
            <li><a href="/" className="hover:underline">Ayuda</a></li>
            <li><a href="/" className="hover:underline">Actualizar</a></li>
            <li><a href="/" className="hover:underline">Desarrollos personalizados</a></li>
            <li><a href="/" className="hover:underline">Educación</a></li>
            <li><a href="/" className="hover:underline">Encuentra un contador</a></li>
            <li><a href="/" className="hover:underline">Encuentra un partner</a></li>
            <li><a href="/" className="hover:underline">Conviértete en partner</a></li>
          </ul>
        </div>

        {/* Sección Sobre Nosotros */}
        <div>
          <h3 className="text-white font-semibold mb-4">Sobre nosotros</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Nuestra empresa</a></li>
            <li><a href="/" className="hover:underline">Activos de marca</a></li>
            <li><a href="/" className="hover:underline">Contáctanos</a></li>
            <li><a href="/" className="hover:underline">Empleos</a></li>
            <li><a href="/" className="hover:underline">Eventos</a></li>
            <li><a href="/" className="hover:underline">Podcast</a></li>
            <li><a href="/" className="hover:underline">Blog</a></li>
            <li><a href="/" className="hover:underline">Clientes</a></li>
          </ul>
        </div>

        {/* Sección de Logo y Descripción */}
        <div className="space-y-4">
          <div className="text-2xl font-bold text-white">TuLogo</div>
          <div className="flex items-center space-x-2 text-gray-400">
            <GlobeAltIcon className="h-5 w-5" />
            <span>Español (América Latina)</span>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Nuestra plataforma ofrece una suite de aplicaciones empresariales que cubren todas las necesidades de tu negocio: CRM, comercio electrónico, inventario, contabilidad, y más.
          </p>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Sección inferior del footer */}
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-500">© 2023 TuEmpresa. Todos los derechos reservados.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/" className="text-gray-400 hover:text-white"><PhoneIcon className="h-5 w-5" /></a>
          <a href="/" className="text-gray-400 hover:text-white"><ChatBubbleBottomCenterTextIcon className="h-5 w-5" /></a>
          <a href="/" className="text-gray-400 hover:text-white"><EnvelopeIcon className="h-5 w-5" /></a>
          <a href="/" className="text-gray-400 hover:text-white"><BuildingOfficeIcon className="h-5 w-5" /></a>
          <a href="/" className="text-gray-400 hover:text-white"><BriefcaseIcon className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
