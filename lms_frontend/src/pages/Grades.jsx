import PageContainer from '../components/PageContainer';
import Table from '../components/Table';

export default function Grades() {
  const columns = [
    { key: 'course', title: 'Course' },
    { key: 'grade', title: 'Grade' },
  ];
  const data = [
    { course: 'Intro to CS', grade: 'A-' },
    { course: 'Software Eng', grade: 'B+' },
  ];
  return (
    <PageContainer title="Grades" subtitle="Your grades across courses">
      <Table columns={columns} data={data} />
    </PageContainer>
  );
}
