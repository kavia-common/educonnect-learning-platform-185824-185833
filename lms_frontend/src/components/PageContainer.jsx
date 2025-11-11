 // PUBLIC_INTERFACE
export default function PageContainer({ title, subtitle, actions, children }) {
  /** Page header with optional actions and content wrapper. */
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
        <div>
          {title && <h1 className="page-title">{title}</h1>}
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        <div>{actions}</div>
      </div>
      {children}
    </div>
  );
}
