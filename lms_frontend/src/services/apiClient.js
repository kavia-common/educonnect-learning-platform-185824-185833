import { httpRequest } from '../utils/http';
import { isFeatureEnabled } from '../utils/featureFlags';
import placeholder from '../assets/mock/placeholder.json';

const MOCK = isFeatureEnabled('mockApi', true);

/**
 * In mock mode, we want the app to start unauthenticated by default so ProtectedRoute redirects to /login.
 * Therefore, getMe() should not auto-authenticate. It should return null to indicate "no active session".
 * The explicit login() call will return a mock token and user to simulate an authenticated session.
 */

// PUBLIC_INTERFACE
export const apiClient = {
  /** REST API client for LMS. Uses mock data when mockApi flag is true. */
  async getMe() {
    if (MOCK) {
      // No persisted token/session in this mock; treat as not logged in on initial load.
      return null;
    }
    return httpRequest('/me');
  },
  async login(email, password) {
    if (MOCK) return { token: 'mock-token', user: { id: 'u1', name: 'Alex Student', role: 'student', email } };
    return httpRequest('/auth/login', { method: 'POST', body: { email, password } });
  },
  async register(payload) {
    if (MOCK) return { success: true, userId: 'u-new' };
    return httpRequest('/auth/register', { method: 'POST', body: payload });
  },
  async courses() {
    if (MOCK) return placeholder.courses || [];
    return httpRequest('/courses');
  },
  async courseById(id) {
    if (MOCK) return (placeholder.courses || []).find(c => c.id === id);
    return httpRequest(`/courses/${id}`);
  },
  async notifications() {
    if (MOCK) return placeholder.notifications || [];
    return httpRequest('/notifications');
  },
  async users() {
    if (MOCK) return placeholder.users || [];
    return httpRequest('/admin/users');
  },
  async grades() {
    if (MOCK) return placeholder.grades || [];
    return httpRequest('/grades');
  }
};
