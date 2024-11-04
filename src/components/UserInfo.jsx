import { useSelector } from 'react-redux';

const UserInfo = () => {
  const userEmail = useSelector((state) => state.auth.user?.email);

  return (
    <div className="flex flex-col items-center text-center text-gray-800 mb-4 p-4 rounded-lg shadow-md border border-gray-200 bg-white">
      <span className="text-xs font-light text-gray-500">Bienvenido,</span>
      <span className="text-lg font-semibold text-gray-900 mt-1">
        {userEmail || "Usuario"}
      </span>
    </div>
  );
};

export default UserInfo;
