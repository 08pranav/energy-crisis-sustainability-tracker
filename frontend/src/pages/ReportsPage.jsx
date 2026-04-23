import ExportButtons from '../components/common/ExportButtons';

export default function ReportsPage() {
  return (
    <section className="panel">
      <h1>Reports</h1>
      <p>Generate CSV or PDF exports for filtered energy and conflict data.</p>
      <ExportButtons />
    </section>
  );
}
