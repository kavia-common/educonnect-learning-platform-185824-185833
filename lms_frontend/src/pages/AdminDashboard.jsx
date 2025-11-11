import PageContainer from '../components/PageContainer';

export default function AdminDashboard() {
  return (
    <PageContainer title="Admin Dashboard" subtitle="System overview and admin tools">
      <div className="surface" style={{ padding: 16 }}>
        Manage users, courses, and system settings.
      </div>
    </PageContainer>
  );
}
