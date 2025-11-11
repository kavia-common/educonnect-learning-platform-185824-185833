import { getApiBase } from './env';
import { logger } from './logger';

const API_BASE = getApiBase();

// PUBLIC_INTERFACE
export async function httpRequest(path, { method = 'GET', headers = {}, body, token } = {}) {
  /** Minimal fetch-based HTTP client that prefixes API base and handles JSON. */
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (token) finalHeaders['Authorization'] = `Bearer ${token}`;

  const resp = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  const contentType = resp.headers.get('content-type') || '';
  let data = null;
  try {
    data = contentType.includes('application/json') ? await resp.json() : await resp.text();
  } catch (e) {
    logger.debug('No JSON body or parse error', e);
  }

  if (!resp.ok) {
    const err = new Error(`HTTP ${resp.status}`);
    err.status = resp.status;
    err.data = data;
    throw err;
  }
  return data;
}
