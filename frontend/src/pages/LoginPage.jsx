import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    dispatch(
      loginSuccess({
        user: { id: 'demo', name: role === 'admin' ? 'Admin User' : 'Analyst User', role },
        accessToken: 'demo-access-token',
        refreshToken: 'demo-refresh-token'
      })
    );
    navigate('/');
  };

  return (
    <section className="auth-card">
      <h1>Login</h1>
      <p>Use the demo buttons to enter the app while backend auth is being completed.</p>
      <div className="button-stack">
        <button className="btn btn-primary" onClick={() => handleDemoLogin('analyst')} type="button">
          Demo as Analyst
        </button>
        <button className="btn btn-secondary" onClick={() => handleDemoLogin('admin')} type="button">
          Demo as Admin
        </button>
      </div>
    </section>
  );
}
