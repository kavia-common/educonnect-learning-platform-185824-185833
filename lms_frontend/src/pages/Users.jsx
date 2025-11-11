import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import Table from '../components/Table';
import { apiClient } from '../services/apiClient';

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    apiClient.users().then(setUsers);
  }, []);
  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
  ];
  return (
    <PageContainer title="Users" subtitle="Admin user management">
      <Table columns={columns} data={users} />
    </PageContainer>
  );
}
