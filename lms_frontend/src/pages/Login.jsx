import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Login() {
  /** Dedicated Login page with Ocean Professional styling and client-side validation placeholders. */
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  // basic form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const emailValid = email.trim().length > 0 && email.includes('@');
  const passwordValid = password.length >= 6;

  const canSubmit = useMemo(() => {
    return emailValid && passwordValid && !submitting;
  }, [emailValid, passwordValid, submitting]);

  function getRedirectTarget() {
    // Always go to Home after login per requirement
    return '/';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      // Mock login via authContext/apiClient in mock mode; no real auth wiring here.
      await login(email, password);
      nav(getRedirectTarget(), { replace: true });
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Unable to sign in';
      setError(msg === 'HTTP 401' ? 'Invalid credentials' : msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: 'calc(100vh - 64px)',
      padding: 24,
      background: 'var(--color-background)'
    }}>
      <section className="surface" style={{
        width: 'min(480px, 96vw)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        padding: 24
      }}>
        <header style={{ marginBottom: 16 }}>
          <h1 style={{
            margin: '0 0 4px 0',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--color-text)'
          }}>Welcome back</h1>
          <p className="text-muted" style={{ margin: 0 }}>Sign in to continue learning</p>
        </header>

        {error && (
          <div role="alert" style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.35)',
            color: 'var(--color-error)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 12
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input
              id="email"
              className="input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!emailValid && email.length > 0}
              autoComplete="username email"
              required
            />
            {!emailValid && email.length > 0 && (
              <div className="text-muted" style={{ fontSize: 12, marginTop: 6, color: '#9CA3AF' }}>
                Enter a valid email address.
              </div>
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label htmlFor="password" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Password</label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!passwordValid && password.length > 0}
              autoComplete="current-password"
              required
              minLength={6}
            />
            {!passwordValid && password.length > 0 && (
              <div className="text-muted" style={{ fontSize: 12, marginTop: 6, color: '#9CA3AF' }}>
                Password must be at least 6 characters.
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!canSubmit}
            style={{
              width: '100%',
              background: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              color: '#fff',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 12,
          fontSize: 14
        }}>
          <Link to="/auth/forgot-password">Forgot password?</Link>
          <Link to="/auth/register">Create account</Link>
        </div>

        <div style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.10), rgba(249,250,251,1))',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ fontSize: 12, color: 'var(--color-text)' }}>
            Tip: This environment uses mock auth. Any email/password (6+ chars) will sign in.
          </div>
        </div>
      </section>
    </div>
  );
}
