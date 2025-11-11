import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../state/authContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ roles }) {
  /** Route guard component. Redirects to /login if unauthenticated; 403 fallback if role mismatch.
   * Default unauthenticated redirect goes to /login.
   */
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  // Unauthenticated: send to /login, include attempted path (may be ignored by login flow per product)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role enforcement if provided
  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <div style={{ padding: 24 }}>403 Forbidden</div>;
  }

  return <Outlet />;
}
