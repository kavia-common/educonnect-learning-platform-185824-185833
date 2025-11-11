import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

// PUBLIC_INTERFACE
export default function Signup() {
  /** Basic Sign Up page with client-side validation using Ocean Professional styles. 
   * Fields: name, email, password, confirm password.
   * No backend integration yet; on submit, we simply show a basic alert and redirect to /login.
   */
  const nav = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [cpw, setCpw] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const nameValid = name.trim().length >= 2;
  const emailValid = email.trim().length > 0 && email.includes('@');
  const pwValid = pw.length >= 6;
  const cpwValid = cpw === pw && cpw.length >= 6;

  const canSubmit = useMemo(() => {
    return nameValid && emailValid && pwValid && cpwValid && !submitting;
  }, [nameValid, emailValid, pwValid, cpwValid, submitting]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      // No backend integration per task requirement.
      // Demonstrate success UX and route to login.
      alert('Account created (demo). Please sign in.');
      nav('/login', { replace: true });
    } catch (err) {
      const msg = err?.message || 'Unable to sign up';
      setError(msg);
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
        width: 'min(520px, 96vw)',
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
          }}>Create your account</h1>
          <p className="text-muted" style={{ margin: 0 }}>Join and start learning today</p>
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
            <label htmlFor="name" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Full name</label>
            <input
              id="name"
              className="input"
              placeholder="Alex Student"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!nameValid && name.length > 0}
              required
            />
            {!nameValid && name.length > 0 && (
              <div className="text-muted" style={{ fontSize: 12, marginTop: 6, color: '#9CA3AF' }}>
                Name must be at least 2 characters.
              </div>
            )}
          </div>

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
              autoComplete="email"
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
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              aria-invalid={!pwValid && pw.length > 0}
              autoComplete="new-password"
              required
              minLength={6}
            />
            {!pwValid && pw.length > 0 && (
              <div className="text-muted" style={{ fontSize: 12, marginTop: 6, color: '#9CA3AF' }}>
                Password must be at least 6 characters.
              </div>
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <label htmlFor="confirm" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Confirm password</label>
            <input
              id="confirm"
              className="input"
              type="password"
              placeholder="••••••••"
              value={cpw}
              onChange={(e) => setCpw(e.target.value)}
              aria-invalid={!cpwValid && cpw.length > 0}
              autoComplete="new-password"
              required
              minLength={6}
            />
            {!cpwValid && cpw.length > 0 && (
              <div className="text-muted" style={{ fontSize: 12, marginTop: 6, color: '#9CA3AF' }}>
                Passwords must match.
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
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 12,
          fontSize: 14
        }}>
          <span className="text-muted">Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </section>
    </div>
  );
}
