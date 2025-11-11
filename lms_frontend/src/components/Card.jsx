 // PUBLIC_INTERFACE
export default function Card({ children, footer, onClick }) {
  /** Basic surface card used for listing items. */
  return (
    <div className="surface" onClick={onClick} style={{ padding: 16, borderRadius: 'var(--radius-md)' }}>
      <div>{children}</div>
      {footer && <div style={{ marginTop: 12, color: 'var(--color-muted)' }}>{footer}</div>}
    </div>
  );
}
