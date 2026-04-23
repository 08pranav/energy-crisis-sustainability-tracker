import KPIStatCard from '../components/common/KPIStatCard';

const sampleEvents = [
  { title: 'Red Sea Shipping Risk', impact: 'High', region: 'Middle East' },
  { title: 'Sanctions on Energy Trade', impact: 'Critical', region: 'Europe' },
  { title: 'Pipeline Disruption', impact: 'Medium', region: 'Central Asia' }
];

export default function DashboardPage() {
  return (
    <section className="page-grid">
      <div className="hero-card">
        <p className="eyebrow">SDG 7 + SDG 13</p>
        <h1>Energy Crisis & Sustainability Tracker</h1>
        <p>
          Monitor how wars and geopolitical shocks move energy prices, disrupt supply, and reshape the
          renewable transition.
        </p>
      </div>

      <div className="kpi-grid">
        <KPIStatCard label="Countries tracked" value="42" hint="Geo dependency coverage" />
        <KPIStatCard label="Active disruptions" value="8" hint="Conflict-linked signals" />
        <KPIStatCard label="Avg. price index" value="127.6" hint="Indexed to 2021 baseline" />
        <KPIStatCard label="Forecast horizon" value="30d" hint="Simple moving average" />
      </div>

      <div className="panel-grid">
        <article className="panel">
          <h2>Latest Geopolitical Events</h2>
          <div className="table-list">
            {sampleEvents.map((event) => (
              <div className="table-row" key={event.title}>
                <strong>{event.title}</strong>
                <span>{event.region}</span>
                <span>{event.impact}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>API-ready Modules</h2>
          <ul className="bullet-list">
            <li>Realtime price feed</li>
            <li>Country dependency choropleth</li>
            <li>Conflict overlay timeline</li>
            <li>CSV/PDF report export</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
