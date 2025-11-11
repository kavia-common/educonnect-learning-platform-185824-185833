import { useEffect } from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, onClose, title, children, footer }) {
  /** Simple modal component. */
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.35)',
      display: 'grid', placeItems: 'center', zIndex: 50
    }} onClick={onClose}>
      <div className="surface" style={{ width: 'min(600px, 92vw)', padding: 16 }} onClick={(e) => e.stopPropagation()}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        <div>{children}</div>
        {footer && <div style={{ marginTop: 12 }}>{footer}</div>}
      </div>
    </div>
  );
}
