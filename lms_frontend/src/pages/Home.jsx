import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/apiClient';

import { useEffect, useState } from 'react';

export default function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    apiClient.courses().then(setCourses);
  }, []);

  return (
    <PageContainer title="Welcome back" subtitle="Quick overview and shortcuts" actions={<Link className="btn btn-primary" to="/courses">Browse Courses</Link>}>
      <div className="grid grid-cols-3">
        <Card footer="Last 7 days">
          <h3 style={{ marginTop: 0 }}>Engagement</h3>
          <Chart data={[2,4,3,6,5,8,10,9,12]} />
        </Card>
        <Card footer="You have 3 pending tasks">
          <h3 style={{ marginTop: 0 }}>Tasks</h3>
          <ul>
            <li>Review assignment submissions</li>
            <li>Complete Module 4</li>
            <li>Schedule group session</li>
          </ul>
        </Card>
        <Card footer={`${courses.length} courses`}>
          <h3 style={{ marginTop: 0 }}>Your Courses</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {courses.slice(0, 4).map(c => (
              <Link key={c.id} to={`/courses/${c.id}`} className="btn">{c.title}</Link>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
