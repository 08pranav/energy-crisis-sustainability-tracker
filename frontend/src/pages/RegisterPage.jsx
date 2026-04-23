import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <section className="auth-card">
      <h1>Register</h1>
      <p>Registration UI placeholder for the production auth flow.</p>
      <Link className="btn btn-primary" to="/login">
        Back to Login
      </Link>
    </section>
  );
}
