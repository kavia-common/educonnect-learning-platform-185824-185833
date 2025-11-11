import { useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/apiClient';

export default function Courses() {
  const [q, setQ] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    apiClient.courses().then(setCourses);
  }, []);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <PageContainer title="Courses" subtitle="Browse and enroll">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ width: 320 }}><SearchBar onSearch={setQ} /></div>
        <button className="btn btn-primary">Create Course</button>
      </div>
      <div className="grid grid-cols-3">
        {filtered.map(c => (
          <Card key={c.id} footer={<span>{c.lessons} lessons • {c.level}</span>}>
            <h3 style={{ marginTop: 0 }}>{c.title}</h3>
            <p className="text-muted">{c.description}</p>
            <div style={{ marginTop: 8 }}>
              <Link className="btn" to={`/courses/${c.id}`}>Open</Link>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
