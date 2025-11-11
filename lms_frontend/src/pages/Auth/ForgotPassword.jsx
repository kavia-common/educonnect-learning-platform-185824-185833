import { useState } from 'react';
import PageContainer from '../../components/PageContainer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function submit(e) {
    e.preventDefault();
    alert('Reset link sent if account exists.');
  }

  return (
    <PageContainer title="Forgot password">
      <form onSubmit={submit} className="surface" style={{ padding: 16, maxWidth: 420 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Send reset link</button>
      </form>
    </PageContainer>
  );
}
