import './SideNav.css';
import { NavLink } from 'react-router-dom';
import { useUI } from '../state/uiContext';
import { useAuthContext } from '../state/authContext';

// PUBLIC_INTERFACE
export default function SideNav() {
  /** Side navigation with role-aware links. */
  const { sidebarOpen } = useUI();
  const { user } = useAuthContext();

  const baseLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/learning', label: 'Learning' },
    { to: '/assessments', label: 'Assessments' },
    { to: '/assignments', label: 'Assignments' },
    { to: '/grades', label: 'Grades' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/settings', label: 'Settings' }
  ];

  const roleLinks = [];
  if (user?.role === 'student') roleLinks.push({ to: '/dashboard/student', label: 'Student Dashboard' });
  if (user?.role === 'instructor') roleLinks.push({ to: '/dashboard/instructor', label: 'Instructor Dashboard' });
  if (user?.role === 'admin') roleLinks.push({ to: '/dashboard/admin', label: 'Admin Dashboard' }, { to: '/users', label: 'Users' });

  const links = [...roleLinks, ...baseLinks];

  return (
    <aside className={`sidenav surface app-sidenav ${sidebarOpen ? 'open' : ''}`}>
      <nav>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
