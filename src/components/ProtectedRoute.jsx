import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../data/initialData';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
