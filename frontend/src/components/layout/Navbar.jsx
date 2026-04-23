import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-badge">SDG</span>
        <span>
          Energy Crisis <strong>& Sustainability Tracker</strong>
        </span>
      </Link>

      <div className="navbar-meta">
        <span className="nav-path">{pathname}</span>
        {isAuthenticated ? (
          <>
            <span className="nav-user">{user?.name || 'Analyst'}</span>
            <button className="btn btn-ghost" onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <Link className="btn btn-ghost" to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
