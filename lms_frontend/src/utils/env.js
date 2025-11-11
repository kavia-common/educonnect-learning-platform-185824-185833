 // PUBLIC_INTERFACE
export function getEnvVar(name, fallback = undefined) {
  /** Returns an environment variable from CRA prefixed variables. */
  const v = process.env[name];
  return v !== undefined ? v : fallback;
}

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Base URL for REST API, from REACT_APP_API_BASE or REACT_APP_BACKEND_URL. */
  return (
    getEnvVar('REACT_APP_API_BASE') ||
    getEnvVar('REACT_APP_BACKEND_URL') ||
    ''
  );
}

// PUBLIC_INTERFACE
export function getWsUrl() {
  /** WebSocket base URL for notifications/realtime. */
  return getEnvVar('REACT_APP_WS_URL') || '';
}

// PUBLIC_INTERFACE
export function getLogLevel() {
  /** Logger verbosity level: error, warn, info, debug */
  return getEnvVar('REACT_APP_LOG_LEVEL', 'info');
}

// PUBLIC_INTERFACE
export function getFeatureFlagsRaw() {
  /** Raw feature flags JSON string. */
  return getEnvVar('REACT_APP_FEATURE_FLAGS', '{}');
}

// PUBLIC_INTERFACE
export function isExperimentsEnabled() {
  /** Boolean indicating if experiments bucket enabled. */
  return (getEnvVar('REACT_APP_EXPERIMENTS_ENABLED', 'false') + '').toLowerCase() === 'true';
}
