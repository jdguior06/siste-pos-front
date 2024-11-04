import { useSelector } from 'react-redux';
import { selectHasPermission } from '../reducers/authSlice';

const PermissionWrapper = ({ permission, children }) => {
  const hasPermission = useSelector((state) => selectHasPermission(state, permission));

  if (!hasPermission) return null;

  return <>{children}</>;
};

export default PermissionWrapper;
