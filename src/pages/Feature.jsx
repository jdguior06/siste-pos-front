
const Feature = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
      <div className="text-blue-500 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
};

export default Feature;
