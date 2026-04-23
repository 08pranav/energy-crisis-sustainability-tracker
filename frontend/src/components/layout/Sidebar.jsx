import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sidebar({ items = [] }) {
  const role = useSelector((state) => state.auth.user?.role || 'analyst');

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-label">Workspace</p>
        <h2>Global Energy Intelligence</h2>
        <p className="sidebar-copy">Track prices, conflicts, renewables, and country dependency in one place.</p>
      </div>

      <nav className="sidebar-nav">
        {items
          .filter((item) => !item.adminOnly || role === 'admin')
          .map((item) => (
            <Link key={item.to} to={item.to} className="sidebar-link">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
      </nav>
    </aside>
  );
}
