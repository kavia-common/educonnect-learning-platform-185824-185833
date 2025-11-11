 // PUBLIC_INTERFACE
export default function Badge({ color = 'primary', children }) {
  /** Small status badge. */
  const colors = {
    primary: 'rgba(37,99,235,.1)',
    amber: 'rgba(245,158,11,.12)',
    success: 'rgba(16,185,129,.12)',
    error: 'rgba(239,68,68,.12)',
  };
  const text = {
    primary: '#2563EB',
    amber: '#9A5A06',
    success: '#0F766E',
    error: '#B91C1C',
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '2px 8px', fontSize: 12, borderRadius: 999,
      background: colors[color] || colors.primary,
      color: text[color] || text.primary,
      border: '1px solid var(--color-border)'
    }}>
      {children}
    </span>
  );
}
