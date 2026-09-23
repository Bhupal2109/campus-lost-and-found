import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers, addNotification } from '../data/initialData';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const users = getUsers();
    const user = users.find(
      u => u.email && u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    // Simulate authentication delay
    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      addNotification({
        message: `Welcome back, ${user.name}!`
      });
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand" aria-label="Lost and Found logo">
          <span className="auth-brand-icon" aria-hidden="true">🔍</span>
        </div>

        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Lost &amp; Found account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@university.edu"
              required
            />
          </div>

          <div className="form-group form-group-password">
            <div className="form-row-inline">
              <label htmlFor="password">Password</label>
              <Link to="/login" className="inline-link">Forgot password?</Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large auth-submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="auth-admin-link-wrap">
          <Link to="/login" className="auth-admin-link">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
