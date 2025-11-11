import { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import { apiClient } from '../../services/apiClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  async function handle(e) {
    e.preventDefault();
    await apiClient.register(form);
    nav('/auth/login');
  }

  return (
    <PageContainer title="Create account">
      <form onSubmit={handle} className="surface" style={{ padding: 16, maxWidth: 420 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Name</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
        <div style={{ marginTop: 10, fontSize: 14 }}>
          <span className="text-muted">Already have an account? </span>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </PageContainer>
  );
}
