
import UserInfo from "../components/UserInfo";

const Home = () => {
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bienvenido al Dashboard</h2>
      <div className="mb-4">
        <UserInfo /> {/* Agrega UserInfo aquí */}
      </div>
      <p>Este es el resumen de tu punto de venta.</p>
    </div>
  );
};

export default Home;
