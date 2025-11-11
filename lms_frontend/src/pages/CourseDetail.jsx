import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Breadcrumbs from '../components/Breadcrumbs';
import { apiClient } from '../services/apiClient';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    apiClient.courseById(id).then(setCourse);
  }, [id]);

  if (!course) return <PageContainer title="Loading..." />;

  return (
    <PageContainer title={course.title} subtitle={course.description} actions={<button className="btn btn-primary">Enroll</button>}>
      <Breadcrumbs items={[{ label: 'Courses', to: '/courses' }, { label: course.title }]} />
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <Card>
          <h3 style={{ marginTop: 0 }}>Curriculum</h3>
          <ul>
            {course.modules?.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </Card>
        <Card>
          <h3 style={{ marginTop: 0 }}>Instructor</h3>
          <p className="text-muted">{course.instructor || 'TBD'}</p>
        </Card>
      </div>
    </PageContainer>
  );
}
