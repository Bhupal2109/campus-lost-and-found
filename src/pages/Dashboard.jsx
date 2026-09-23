import { Link } from 'react-router-dom';
import { getCurrentUser, getItems } from '../data/initialData';
import './Dashboard.css';

export default function Dashboard() {
  const currentUser = getCurrentUser();
  const items = getItems();
  const userItems = items.filter(i => i.reportedBy === currentUser.id);

  const stats = {
    totalReports: userItems.length,
    lostReports: userItems.filter(i => i.type === 'lost').length,
    foundReports: userItems.filter(i => i.type === 'found').length,
    resolvedItems: userItems.filter(i => i.status === 'resolved').length
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser.name}! 👋</h1>
        <p>University Lost & Found Dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalReports}</div>
            <div className="stat-label">Total Reports</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <div className="stat-number">{stats.lostReports}</div>
            <div className="stat-label">Lost Items</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.foundReports}</div>
            <div className="stat-label">Found Items</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎉</div>
          <div className="stat-content">
            <div className="stat-number">{stats.resolvedItems}</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/report" className="action-card">
            <div className="action-icon">📝</div>
            <h3>Report Lost Item</h3>
            <p>Post a new lost item</p>
          </Link>
          <Link to="/report" className="action-card">
            <div className="action-icon">🔍</div>
            <h3>Report Found Item</h3>
            <p>Post a found item</p>
          </Link>
          <Link to="/items" className="action-card">
            <div className="action-icon">🛍️</div>
            <h3>Browse Items</h3>
            <p>Search all listings</p>
          </Link>
          <Link to="/my-items" className="action-card">
            <div className="action-icon">📚</div>
            <h3>My Reports</h3>
            <p>Manage your items</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-section">
        <h2>Recent Items</h2>
        {userItems.length === 0 ? (
          <div className="empty-message">
            <p>You haven't reported any items yet.</p>
            <Link to="/report" className="btn btn-primary">
              Report Your First Item
            </Link>
          </div>
        ) : (
          <div className="recent-items">
            {userItems.slice(-5).reverse().map(item => (
              <Link key={item.id} to={`/items/${item.id}`} className="recent-item">
                <div className="recent-title">{item.title}</div>
                <div className="recent-meta">
                  <span className={`badge badge-${item.type}`}>{item.type}</span>
                  <span className="recent-date">{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
