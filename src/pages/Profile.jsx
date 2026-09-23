import { useState } from 'react';
import { getCurrentUser, getUsers, saveUser } from '../data/initialData';
import './Profile.css';

export default function Profile() {
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || currentUser?.fullName || '',
    email: currentUser?.email || '',
    department: currentUser?.department || '',
    year: currentUser?.year || '1'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!currentUser) {
      setError('You must be logged in to update your profile.');
      return;
    }

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const department = formData.department.trim();
    const year = formData.year;

    if (!fullName || !email || !department || !year) {
      setError('Please complete all profile fields.');
      return;
    }

    const users = getUsers();
    const emailExists = users.some(
      user => user.id !== currentUser.id && user.email && user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      setError('An account with this email already exists.');
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: fullName,
      fullName,
      email: email.toLowerCase(),
      department,
      year: String(year)
    };

    saveUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Profile</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Year</label>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
