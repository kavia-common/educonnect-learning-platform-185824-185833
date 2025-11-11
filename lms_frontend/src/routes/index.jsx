import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
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
import Signup from '../pages/Signup';

function ShellLayout() {
  // Authenticated shell: renders TopBar and SideNav around nested routes
  return (
    <div className="app-shell">
      <TopBar />
      <SideNav />
      <main className="app-content">
        <Outlet />
      </main>
      <Toasts />
    </div>
  );
}

function PublicLayout() {
  // Minimal public layout: TopBar + content, no SideNav
  return (
    <>
      <TopBar />
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </main>
      <Toasts />
    </>
  );
}

function NotFoundRedirect() {
  const { user } = useAuthContext();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Navigate to="/" replace />;
}

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Defines all app routes with protection, role-based gates, and unauthenticated default to /login. */
  return (
    <BrowserRouter>
      <Routes>
        {/* Public-only routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Legacy/aux public routes */}
          <Route path="/auth/login" element={<Navigate to="/login" replace />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected application routes under shell layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ShellLayout />}>
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

            {/* Role-based sections */}
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
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
