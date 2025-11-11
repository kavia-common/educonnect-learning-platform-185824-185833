import './SideNav.css';
import { NavLink } from 'react-router-dom';
import { useUI } from '../state/uiContext';
import { useAuthContext } from '../state/authContext';

// PUBLIC_INTERFACE
export default function SideNav() {
  /** Side navigation with role-aware links. */
  const { sidebarOpen } = useUI();
  const { user } = useAuthContext();

  // Keep single source of truth for common links (includes Assignments once)
  const baseLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/learning', label: 'Learning' },
    { to: '/assessments', label: 'Assessments' },
    { to: '/assignments', label: 'Assignments' }, // single assignments link
    { to: '/grades', label: 'Grades' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/settings', label: 'Settings' }
  ];

  // Role-specific links should not duplicate base links
  const roleLinks = [];
  if (user?.role === 'student') roleLinks.push({ to: '/dashboard/student', label: 'Student Dashboard' });
  if (user?.role === 'instructor') roleLinks.push({ to: '/dashboard/instructor', label: 'Instructor Dashboard' });
  if (user?.role === 'admin') roleLinks.push(
    { to: '/dashboard/admin', label: 'Admin Dashboard' },
    { to: '/users', label: 'Users' }
  );

  // Combine role links first to appear above base links, avoid duplicates by keying on `to`
  const deduped = [...roleLinks, ...baseLinks].reduce((acc, link) => {
    if (!acc.some(l => l.to === link.to)) acc.push(link);
    return acc;
  }, []);

  return (
    <aside className={`sidenav surface app-sidenav ${sidebarOpen ? 'open' : ''}`}>
      <nav>
        {deduped.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
