import PageContainer from '../components/PageContainer';
import useFeatureFlags from '../hooks/useFeatureFlags';

export default function Settings() {
  const { isFeatureEnabled, experimentsEnabled } = useFeatureFlags();
  return (
    <PageContainer title="Settings" subtitle="Personalize your experience">
      <div className="surface" style={{ padding: 16 }}>
        <div>Mock API: {String(isFeatureEnabled('mockApi', true))}</div>
        <div>Experiments: {String(experimentsEnabled())}</div>
      </div>
    </PageContainer>
  );
}
