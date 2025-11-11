import { httpRequest } from '../utils/http';
import { isFeatureEnabled } from '../utils/featureFlags';
import placeholder from '../assets/mock/placeholder.json';

const MOCK = isFeatureEnabled('mockApi', true);

// PUBLIC_INTERFACE
export const apiClient = {
  /** REST API client for LMS. Uses mock data when mockApi flag is true. */
  async getMe() {
    if (MOCK) return { id: 'u1', name: 'Alex Student', role: 'student', email: 'alex@example.com' };
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
