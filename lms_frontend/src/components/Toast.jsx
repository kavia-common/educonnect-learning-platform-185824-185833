import { useUI } from '../state/uiContext';

// PUBLIC_INTERFACE
export default function Toasts() {
  /** Renders transient toasts from UI context. */
  const { toasts } = useUI();
  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, display: 'grid', gap: 8, zIndex: 60 }}>
      {toasts.map(t => (
        <div key={t.id} className="surface" style={{ padding: 12, minWidth: 220, boxShadow: 'var(--shadow-md)' }}>
          <strong>{t.title}</strong>
          {t.message && <div className="text-muted">{t.message}</div>}
        </div>
      ))}
    </div>
  );
}
