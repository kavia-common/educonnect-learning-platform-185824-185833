import { experimentsEnabled, isFeatureEnabled } from '../utils/featureFlags';

// PUBLIC_INTERFACE
export default function useFeatureFlags() {
  /** Exposes feature flags helpers */
  return { isFeatureEnabled, experimentsEnabled };
}
