import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';
import ProtectedRoute from '../components/ProtectedRoute';
import Toasts from '../components/Toast';
import { useAuthContext } from '../state/authContext';

import Home from '../pages/Home';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import Learning from '../pages/Learning';
import Assessments from '../pages/Assessments';
import Assignments from '../pages/Assignments';
import Grades from '../pages/Grades';
import Gradebook from '../pages/Gradebook';
import Analytics from '../pages/Analytics';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import AdminDashboard from '../pages/AdminDashboard';
import InstructorDashboard from '../pages/InstructorDashboard';
import StudentDashboard from '../pages/StudentDashboard';

function ShellLayout({ children }) {
  return (
    <div className="app-shell">
      <TopBar />
      <SideNav />
      <main className="app-content">
        {children}
      </main>
      <Toasts />
    </div>
  );
}

function PublicLayout({ children }) {
  // A minimal layout for public pages (no TopBar/SideNav content area)
  return (
    <>
      <TopBar />
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>
        {children}
      </main>
      <Toasts />
    </>
  );
}

function DefaultRouteRedirect() {
  // Redirect root to / or /login based on auth via ProtectedRoute grouping already,
  // but ensure a clean default when visiting "/" by gating through ProtectedRoute.
  return <Navigate to="/" replace />;
}

function NotFoundRedirect() {
  const { user } = useAuthContext();
  const location = useLocation();
  // Unknown route: if not authenticated, redirect to login with return path
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // If authenticated, send to home
  return <Navigate to="/" replace />;
}

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Defines all app routes with protection, role-based gates, and unauthenticated default to /login. */
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected application shell */}
        <Route element={<ShellLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/gradebook" element={<Gradebook />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={['instructor']} />}>
            <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={['student']} />}>
            <Route path="/dashboard/student" element={<StudentDashboard />} />
          </Route>
        </Route>

        {/* Public auth pages */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/login" element={<Navigate to="/login" replace />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Default redirect (no path) could route to "/" which is guarded */}
        <Route path="" element={<DefaultRouteRedirect />} />

        {/* Catch-all: redirect based on auth presence */}
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
