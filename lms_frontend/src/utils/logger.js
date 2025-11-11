import { getLogLevel } from './env';

const levels = ['error', 'warn', 'info', 'debug'];
let current = getLogLevel();
if (!levels.includes(current)) current = 'info';

function shouldLog(level) {
  return levels.indexOf(level) <= levels.indexOf(current);
}

// PUBLIC_INTERFACE
export const logger = {
  /** Lightweight logger honoring REACT_APP_LOG_LEVEL */
  error: (...args) => shouldLog('error') && console.error('[LMS]', ...args),
  warn: (...args) => shouldLog('warn') && console.warn('[LMS]', ...args),
  info: (...args) => shouldLog('info') && console.info('[LMS]', ...args),
  debug: (...args) => shouldLog('debug') && console.debug('[LMS]', ...args),
  setLevel: (level) => {
    if (levels.includes(level)) current = level;
  },
  getLevel: () => current
};
