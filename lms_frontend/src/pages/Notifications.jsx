import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import { apiClient } from '../services/apiClient';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    apiClient.notifications().then(setNotifications);
  }, []);
  return (
    <PageContainer title="Notifications" subtitle="Recent messages and updates">
      <div className="grid">
        {notifications.map((n, idx) => (
          <div key={idx} className="surface" style={{ padding: 12 }}>
            <strong>{n.title}</strong>
            <div className="text-muted">{n.body}</div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
