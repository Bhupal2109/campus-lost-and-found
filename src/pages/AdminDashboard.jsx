import { getItems, getClaims, getUsers } from '../data/initialData';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const users = getUsers();
  const items = getItems();
  const claims = getClaims();

  const stats = {
    totalUsers: users.length,
    totalItems: items.length,
    lostItems: items.filter(i => i.type === 'lost').length,
    foundItems: items.filter(i => i.type === 'found').length,
    resolvedItems: items.filter(i => i.status === 'resolved').length,
    totalClaims: claims.length,
    pendingClaims: claims.filter(c => c.status === 'pending').length
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>
        <div className="admin-stat-card">
          <h3>{stats.totalItems}</h3>
          <p>Total Items</p>
        </div>
        <div className="admin-stat-card">
          <h3>{stats.lostItems}</h3>
          <p>Lost Items</p>
        </div>
        <div className="admin-stat-card">
          <h3>{stats.foundItems}</h3>
          <p>Found Items</p>
        </div>
        <div className="admin-stat-card">
          <h3>{stats.resolvedItems}</h3>
          <p>Resolved Items</p>
        </div>
        <div className="admin-stat-card">
          <h3>{stats.pendingClaims}</h3>
          <p>Pending Claims</p>
        </div>
      </div>

      <div className="admin-section">
        <h2>Recent Items</h2>
        <div className="admin-table">
          {items.slice(-5).map(item => (
            <div key={item.id} className="admin-row">
              <span>{item.title}</span>
              <span>{item.type}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section">
        <h2>Pending Claims</h2>
        <div className="admin-table">
          {claims.filter(c => c.status === 'pending').map(claim => (
            <div key={claim.id} className="admin-row">
              <span>Claim #{claim.id.slice(-4)}</span>
              <span>{claim.status}</span>
              <button className="btn btn-small">Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
