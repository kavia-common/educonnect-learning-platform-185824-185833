 // PUBLIC_INTERFACE
export default function Pagination({ page = 1, total = 1, onChange }) {
  /** Minimal pagination control. */
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button className="btn" disabled={page <= 1} onClick={() => onChange?.(page - 1)}>Prev</button>
      <span>Page {page} of {total}</span>
      <button className="btn" disabled={page >= total} onClick={() => onChange?.(page + 1)}>Next</button>
    </div>
  );
}
