import { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);

  async function handle(e) {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  }

  return (
    <PageContainer title="Sign in" subtitle="Welcome back">
      <form onSubmit={handle} className="surface" style={{ padding: 16, maxWidth: 420 }}>
        {error && <div style={{ color: 'var(--color-error)' }}>{error}</div>}
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
        <div style={{ marginTop: 10 }}>
          <Link to="/forgot-password">Forgot password?</Link> • <Link to="/register">Create account</Link>
        </div>
      </form>
    </PageContainer>
  );
}
