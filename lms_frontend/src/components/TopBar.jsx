import './TopBar.css';
import { useUI } from '../state/uiContext';
import { useAuthContext } from '../state/authContext';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function TopBar() {
  /** App top bar with brand, search, notifications, and profile menu. */
  const { setSidebarOpen } = useUI();
  const { user, logout } = useAuthContext();
  return (
    <header className="topbar surface app-topbar">
      <button className="icon-btn" onClick={() => setSidebarOpen(v => !v)} aria-label="Toggle navigation">
        ☰
      </button>
      <Link to="/" className="brand">
        <span className="brand-logo">🌊</span>
        <span className="brand-name">OceanLMS</span>
      </Link>
      <div className="topbar-actions">
        <Link to="/notifications" className="icon-btn" aria-label="Notifications">🔔</Link>
        {user ? (
          <div className="profile">
            <span className="avatar">{user.name?.[0] || 'U'}</span>
            <div className="profile-menu">
              <Link to="/profile">Profile</Link>
              <button className="link" onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link className="btn btn-primary" to="/login">Sign in</Link>
        )}
      </div>
    </header>
  );
}
