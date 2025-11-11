import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';
import ProtectedRoute from '../components/ProtectedRoute';
import Toasts from '../components/Toast';

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
import Login from '../pages/Auth/Login';
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

// PUBLIC_INTERFACE
export default function AppRoutes() {
  /** Defines all app routes with protection and role-based gates. */
  return (
    <BrowserRouter>
      <ShellLayout>
        <Routes>
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

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="*" element={<div style={{ padding: 24 }}>Not Found</div>} />
        </Routes>
      </ShellLayout>
    </BrowserRouter>
  );
}
