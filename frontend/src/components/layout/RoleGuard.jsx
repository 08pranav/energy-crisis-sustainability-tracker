import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RoleGuard({ roles = [], children }) {
  const role = useSelector((state) => state.auth.user?.role);

  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
