import { getWsUrl } from '../utils/env';
import { logger } from '../utils/logger';

let ws;

// PUBLIC_INTERFACE
export function connectNotifications(onMessage) {
  /** Connects to WS server for notifications and returns a disposer. */
  const url = getWsUrl();
  if (!url) {
    logger.warn('REACT_APP_WS_URL not set; skipping WS connect');
    return () => {};
  }
  ws = new WebSocket(url);
  ws.onopen = () => logger.info('WS connected');
  ws.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      onMessage && onMessage(data);
    } catch {
      onMessage && onMessage(e.data);
    }
  };
  ws.onerror = (e) => logger.warn('WS error', e);
  ws.onclose = () => logger.info('WS closed');

  return () => {
    try { ws && ws.close(); } catch {}
    ws = undefined;
  };
}
