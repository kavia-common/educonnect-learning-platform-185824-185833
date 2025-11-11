import PageContainer from '../components/PageContainer';
import Card from '../components/Card';

export default function Learning() {
  return (
    <PageContainer title="Learning" subtitle="Continue where you left off">
      <div className="grid grid-cols-3">
        <Card footer="Module 3">
          <h3 style={{ marginTop: 0 }}>Design Patterns</h3>
          <p className="text-muted">Continue from Lesson 2</p>
          <button className="btn btn-primary">Resume</button>
        </Card>
        <Card footer="Module 1">
          <h3 style={{ marginTop: 0 }}>Data Structures</h3>
          <p className="text-muted">Start now</p>
          <button className="btn">Start</button>
        </Card>
      </div>
    </PageContainer>
  );
}
