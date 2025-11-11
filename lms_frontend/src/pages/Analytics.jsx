import PageContainer from '../components/PageContainer';
import Card from '../components/Card';
import Chart from '../components/Chart';

export default function Analytics() {
  return (
    <PageContainer title="Analytics" subtitle="Insights and trends">
      <div className="grid grid-cols-3">
        <Card footer="Weekly active users">
          <h3 style={{ marginTop: 0 }}>Activity</h3>
          <Chart data={[4,5,6,8,9,7,10,12,15,13,12]} />
        </Card>
        <Card footer="Completion rate">
          <h3 style={{ marginTop: 0 }}>Progress</h3>
          <Chart data={[3,3,4,6,7,8,8,9,11,12]} />
        </Card>
        <Card footer="Average grade">
          <h3 style={{ marginTop: 0 }}>Performance</h3>
          <Chart data={[70,72,74,76,75,78,80,82,81]} />
        </Card>
      </div>
    </PageContainer>
  );
}
