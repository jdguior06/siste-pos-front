import React from "react";

const Pricing = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Planes de Precios</h2>
        <p className="text-lg text-gray-600">
          Elige el plan que mejor se adapte a las necesidades de tu restaurante. Todos incluyen acceso completo al sistema POS.
        </p>
      </section>

      {/* Tarjetas de Precios */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          plan="Básico"
          price="15"
          features={["1 Terminal", "Soporte Básico", "Reportes Básicos", "Pagos en Efectivo"]}
          buttonLabel="Comenzar"
          popular={false}
        />
        <PricingCard
          plan="Pro"
          price="30"
          features={["3 Terminales", "Soporte Prioritario", "Reportes Avanzados", "Pagos en Efectivo y Tarjeta"]}
          buttonLabel="Comenzar"
          popular={true}
        />
        <PricingCard
          plan="Premium"
          price="50"
          features={["Ilimitadas Terminales", "Soporte Premium 24/7", "Reportes Complejos", "Todos los Métodos de Pago"]}
          buttonLabel="Comenzar"
          popular={false}
        />
      </section>
    </div>
  );
};

// Componente de Tarjeta de Precio
const PricingCard = ({ plan, price, features = [], buttonLabel, popular }) => {
  return (
    <div className={`border ${popular ? "border-purple-600" : "border-gray-200"} rounded-lg shadow-lg overflow-hidden`}>
      <div className={`p-6 ${popular ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"} text-center`}>
        {popular && <p className="uppercase text-sm font-bold mb-2 text-yellow-300">Más Popular</p>}
        <h3 className="text-2xl font-bold">{plan}</h3>
        <p className="mt-4 text-4xl font-bold">${price} <span className="text-lg font-medium">/mes</span></p>
      </div>
      <div className="p-6 bg-white text-gray-600">
        <ul className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="h-4 w-4 mr-2 inline-block bg-purple-600 rounded-full"></span> {feature}
            </li>
          ))}
        </ul>
        <button
          className={`w-full py-3 rounded-lg text-lg font-semibold transition ${
            popular ? "bg-yellow-300 text-purple-800 hover:bg-yellow-400" : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Pricing;
