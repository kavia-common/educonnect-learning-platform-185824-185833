import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../state/authContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ roles }) {
  /** Route guard component. Redirects to /login if unauthenticated; 403 fallback if role mismatch. */
  const { user, loading } = useAuthContext();

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <div style={{ padding: 24 }}>403 Forbidden</div>;
  }
  return <Outlet />;
}
