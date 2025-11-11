import PageContainer from '../components/PageContainer';
import Table from '../components/Table';

export default function Assignments() {
  const columns = [
    { key: 'title', title: 'Assignment' },
    { key: 'course', title: 'Course' },
    { key: 'status', title: 'Status' },
  ];
  const data = [
    { title: 'Essay', course: 'English 101', status: 'Submitted' },
    { title: 'Lab 2', course: 'Physics', status: 'Pending' },
  ];
  return (
    <PageContainer title="Assignments" subtitle="Track your submissions and deadlines">
      <Table columns={columns} data={data} />
    </PageContainer>
  );
}
