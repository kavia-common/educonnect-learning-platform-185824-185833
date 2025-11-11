import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Breadcrumbs({ items = [] }) {
  /** Simple breadcrumbs trail. */
  return (
    <nav style={{ marginBottom: 12, fontSize: 14 }}>
      {items.map((it, idx) => (
        <span key={idx}>
          {idx > 0 && ' / '}
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
