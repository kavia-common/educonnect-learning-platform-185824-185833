import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../state/authContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ roles }) {
  /** Route guard component. Redirects to /login if unauthenticated; 403 fallback if role mismatch. 
   * If redirected, passes the attempted path in state.from for post-login return.
   */
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <div style={{ padding: 24 }}>403 Forbidden</div>;
  }
  return <Outlet />;
}
