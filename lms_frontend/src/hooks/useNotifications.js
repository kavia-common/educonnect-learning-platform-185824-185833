import { useEffect } from 'react';
import { connectNotifications } from '../services/wsClient';
import { useUI } from '../state/uiContext';

// PUBLIC_INTERFACE
export default function useNotifications() {
  /** Connect to WebSocket and publish toasts for notifications. */
  const { addToast } = useUI();
  useEffect(() => {
    const dispose = connectNotifications((msg) => {
      addToast({ title: msg.title || 'Notification', message: msg.body || String(msg) });
    });
    return () => dispose();
  }, [addToast]);
}
