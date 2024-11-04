const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
