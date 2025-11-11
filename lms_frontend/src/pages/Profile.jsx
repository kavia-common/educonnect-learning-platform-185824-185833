import PageContainer from '../components/PageContainer';
import useAuth from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  return (
    <PageContainer title="Profile" subtitle="Your account details">
      <div className="surface" style={{ padding: 16 }}>
        <div><strong>Name:</strong> {user?.name}</div>
        <div><strong>Email:</strong> {user?.email}</div>
        <div><strong>Role:</strong> {user?.role}</div>
      </div>
    </PageContainer>
  );
}
