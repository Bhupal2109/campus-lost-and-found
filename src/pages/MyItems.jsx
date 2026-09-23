import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getItems, getCurrentUser, saveItem, addNotification } from '../data/initialData';
import './ListPages.css';

export default function MyItems() {
  const currentUser = getCurrentUser();
  const items = getItems();
  const userItems = items.filter(i => i.reportedBy === currentUser.id);
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? userItems 
    : userItems.filter(i => filter === 'lost' ? i.type === 'lost' : filter === 'found' ? i.type === 'found' : i.status === 'resolved');

  const handleDelete = (itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const allItems = getItems();
      const updated = allItems.filter(i => i.id !== itemId);
      localStorage.setItem('items', JSON.stringify(updated));
      addNotification({ message: 'Item deleted successfully' });
      window.location.reload();
    }
  };

  const handleMarkResolved = (itemId) => {
    const allItems = getItems();
    const item = allItems.find(i => i.id === itemId);
    if (item) {
      item.status = 'resolved';
      item.updatedAt = new Date().toISOString();
      saveItem(item);
      addNotification({ message: 'Item marked as resolved' });
      window.location.reload();
    }
  };

  return (
    <div className="list-page">
      <h1>My Items</h1>
      <div className="list-filter-tabs">
        {['all', 'lost', 'found', 'resolved'].map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <p>No items found</p>
          <Link to="/report" className="btn btn-primary">Report an Item</Link>
        </div>
      ) : (
        <div className="list-items">
          {filteredItems.map(item => (
            <div key={item.id} className="list-item-card">
              <div className="list-item-content">
                <Link to={`/items/${item.id}`} className="list-item-title">{item.title}</Link>
                <div className="list-item-meta">
                  <span className={`badge badge-${item.type}`}>{item.type}</span>
                  <span>{item.category}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="list-item-actions">
                <Link to={`/items/${item.id}`} className="btn btn-secondary btn-small">View</Link>
                {item.status !== 'resolved' && (
                  <button className="btn btn-success btn-small" onClick={() => handleMarkResolved(item.id)}>Mark Resolved</button>
                )}
                <button className="btn btn-error btn-small" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
