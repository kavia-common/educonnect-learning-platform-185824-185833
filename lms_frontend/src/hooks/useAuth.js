import { useAuthContext } from '../state/authContext';

// PUBLIC_INTERFACE
export default function useAuth() {
  /** Hook for auth context. */
  return useAuthContext();
}
