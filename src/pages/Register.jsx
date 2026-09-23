import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers, saveUser } from '../data/initialData';
import './Auth.css';

const DEPARTMENTS = ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts', 'Sciences'];
const YEARS = [1, 2, 3, 4];

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const studentId = formData.studentId.trim();
    const department = formData.department.trim();
    const year = formData.year;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !email || !studentId || !department || !year || !password || !confirmPassword) {
      setError('Please complete all required fields.');
      return;
    }

    if (!validEmailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users = getUsers();
    if (users.some(u => u.email && u.email.toLowerCase() === email.toLowerCase())) {
      setError('An account with this email already exists.');
      return;
    }

    setLoading(true);

    const newUser = {
      id: 'user_' + Date.now(),
      email: email.toLowerCase(),
      password,
      name: fullName,
      studentId,
      department,
      year: parseInt(year, 10),
      role: 'user',
      profileImage: null,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('lostFoundUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    saveUser(newUser);

    setSuccess('Registration successful! Redirecting to login...');

    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join the Lost & Found community</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">University Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@university.edu"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <input
                id="studentId"
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="STU001234"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                {YEARS.map(y => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
