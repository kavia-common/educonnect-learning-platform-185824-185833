 // PUBLIC_INTERFACE
export default function Chart({ data = [] }) {
  /** Very simple sparkline-like chart with SVG, no deps. */
  const w = 300, h = 80, pad = 8;
  const xs = data.map((_, i) => i);
  const ys = data;
  const maxX = Math.max(...xs, 1);
  const maxY = Math.max(...ys, 1);
  const toX = (x) => pad + (x / maxX) * (w - pad * 2);
  const toY = (y) => h - pad - (y / maxY) * (h - pad * 2);
  const path = data.map((y, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(y)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="80">
      <rect x="0" y="0" width={w} height={h} fill="white" rx="8" />
      <path d={path} fill="none" stroke="#2563EB" strokeWidth="2" />
    </svg>
  );
}
