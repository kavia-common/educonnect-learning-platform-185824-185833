 // PUBLIC_INTERFACE
export default function Table({ columns, data }) {
  /** Minimal table with plain styles. */
  return (
    <div className="surface" style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--color-border)' }}>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(c => (
                <td key={c.key} style={{ padding: 12, borderBottom: '1px solid var(--color-border)' }}>
                  {typeof c.render === 'function' ? c.render(row[c.key], row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
