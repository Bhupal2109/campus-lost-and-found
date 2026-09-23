import { useState } from 'react';
import { getClaims, getItems, getCurrentUser } from '../data/initialData';
import './ListPages.css';

export default function Claims() {
  const currentUser = getCurrentUser();
  const claims = getClaims();
  const items = getItems();
  const userClaims = claims.filter(c => c.claimedBy === currentUser.id);
  const [filter, setFilter] = useState('all');

  const filteredClaims = filter === 'all' 
    ? userClaims 
    : userClaims.filter(c => c.status === filter);

  return (
    <div className="list-page">
      <h1>My Claims</h1>
      <div className="list-filter-tabs">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredClaims.length === 0 ? (
        <div className="empty-state">
          <p>No claims found. <a href="/items">Browse items</a> to start claiming.</p>
        </div>
      ) : (
        <div className="list-items">
          {filteredClaims.map(claim => {
            const item = items.find(i => i.id === claim.itemId);
            return (
              <div key={claim.id} className="list-item-card">
                <div className="list-item-content">
                  <div className="list-item-title">{item?.title}</div>
                  <div className="list-item-meta">
                    <span className={`badge badge-${claim.status}`}>{claim.status}</span>
                    <span>{new Date(claim.createdAt).toLocaleDateString()}</span>
                    <span>{claim.status === 'approved' && '✅ Approved'}</span>
                    <span>{claim.status === 'rejected' && '❌ Rejected'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
