import PageContainer from '../components/PageContainer';
import Table from '../components/Table';

export default function Assessments() {
  const columns = [
    { key: 'name', title: 'Assessment' },
    { key: 'course', title: 'Course' },
    { key: 'due', title: 'Due' },
  ];
  const data = [
    { name: 'Quiz 1', course: 'Intro to CS', due: '2025-05-30' },
    { name: 'Project Proposal', course: 'Software Eng', due: '2025-06-10' },
  ];
  return (
    <PageContainer title="Assessments" subtitle="Upcoming and past assessments">
      <Table columns={columns} data={data} />
    </PageContainer>
  );
}
