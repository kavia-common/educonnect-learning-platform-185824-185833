import { useMemo, useState } from 'react';
import PageContainer from '../../components/PageContainer';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Login() {
  /** Sign-in page using authContext; validates inputs, handles loading/errors, redirects on success. */
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState('alex@example.com'); // email or username
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    const okId = typeof identifier === 'string' && identifier.trim().length >= 3;
    const okPw = typeof password === 'string' && password.length >= 6;
    return okId && okPw && !submitting;
  }, [identifier, password, submitting]);

  function getRedirectTarget() {
    // Always send to Home after successful login
    return '/';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      // api expects email; allow username by passing through as email field for mock
      await login(identifier, password);
      nav(getRedirectTarget(), { replace: true });
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Unable to sign in';
      setError(msg === 'HTTP 401' ? 'Invalid credentials' : msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageContainer title="Sign in" subtitle="Welcome back">
      <form onSubmit={handleSubmit} className="surface" style={{ padding: 16, maxWidth: 460 }}>
        {error && (
          <div role="alert" style={{ color: 'var(--color-error)', marginBottom: 10 }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="identifier">Email or Username</label>
          <input
            id="identifier"
            className="input"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username email"
            placeholder="you@example.com or username"
            required
            aria-invalid={!!error}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            minLength={6}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
        <div style={{ marginTop: 10 }}>
          <Link to="/auth/forgot-password">Forgot password?</Link> •{' '}
          <Link to="/auth/register">Create account</Link>
        </div>
      </form>
    </PageContainer>
  );
}
