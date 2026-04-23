export default function KPIStatCard({ label, value, hint }) {
  return (
    <article className="kpi-card">
      <p>{label}</p>
      <h3>{value}</h3>
      <span>{hint}</span>
    </article>
  );
}
