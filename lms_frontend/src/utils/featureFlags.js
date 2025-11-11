import { getFeatureFlagsRaw, isExperimentsEnabled } from './env';
import { logger } from './logger';

let parsedFlags = {};
try {
  parsedFlags = JSON.parse(getFeatureFlagsRaw() || '{}');
} catch (e) {
  logger.warn('Invalid REACT_APP_FEATURE_FLAGS JSON, using {}');
  parsedFlags = {};
}

// PUBLIC_INTERFACE
export function isFeatureEnabled(flagName, defaultValue = false) {
  /** Returns if a given feature flag is enabled. */
  if (flagName in parsedFlags) return !!parsedFlags[flagName];
  return defaultValue;
}

// PUBLIC_INTERFACE
export function experimentsEnabled() {
  /** Returns if experiments bucket is enabled. */
  return isExperimentsEnabled();
}
