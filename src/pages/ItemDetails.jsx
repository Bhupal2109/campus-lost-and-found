import { useParams } from 'react-router-dom';
import { getItems, getClaims, getCurrentUser, saveClaim, addNotification } from '../data/initialData';
import { useState } from 'react';
import Modal from '../components/Modal';
import './ItemDetails.css';

function calculateMatchPercentage(item1, item2) {
  let matches = 0;
  let criteria = 0;

  if (item1.category === item2.category) matches++;
  criteria++;

  if (item1.location === item2.location) matches++;
  criteria++;

  if (item1.color === item2.color) matches++;
  criteria++;

  if (item1.brand === item2.brand) matches++;
  criteria++;

  const date1 = new Date(item1.date);
  const date2 = new Date(item2.date);
  const dayDiff = Math.abs((date1 - date2) / (1000 * 60 * 60 * 24));
  if (dayDiff <= 7) matches += 0.5;
  criteria++;

  return Math.round((matches / criteria) * 100);
}

export default function ItemDetails() {
  const { id } = useParams();
  const items = getItems();
  const item = items.find(i => i.id === id);
  const currentUser = getCurrentUser();
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimData, setClaimData] = useState({
    location: '',
    identifyingFeature: '',
    contents: '',
    additionalDetails: ''
  });

  if (!item) {
    return (
      <div className="item-details-page">
        <div className="error-state">
          <p>Item not found</p>
        </div>
      </div>
    );
  }

  const possibleMatches = items
    .filter(i => i.id !== item.id && i.type !== item.type && i.status === 'available')
    .map(i => ({
      ...i,
      matchPercentage: calculateMatchPercentage(item, i)
    }))
    .filter(i => i.matchPercentage >= 40)
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  const handleClaimSubmit = (e) => {
    e.preventDefault();

    const claims = getClaims();
    const claim = {
      id: 'claim_' + Date.now(),
      itemId: item.id,
      userId: currentUser.id,
      status: 'pending',
      ...claimData,
      createdAt: new Date().toISOString()
    };

    saveClaim(claim);
    addNotification({
      message: `Claim submitted for "${item.title}". Status: Pending`
    });

    setShowClaimModal(false);
    setClaimData({
      location: '',
      identifyingFeature: '',
      contents: '',
      additionalDetails: ''
    });

    // Show success message
    setTimeout(() => {
      alert('Claim submitted successfully!');
      window.location.reload();
    }, 500);
  };

  return (
    <div className="item-details-page">
      <div className="item-details-container">
        {/* Main Content */}
        <div className="details-main">
          <div className="item-image-large">
            <img src={item.image} alt={item.title} />
            <span className={`badge badge-${item.type}`}>
              {item.type.toUpperCase()}
            </span>
          </div>

          <div className="item-info">
            <h1>{item.title}</h1>

            <div className="info-section">
              <h3>Description</h3>
              <p>{item.description}</p>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Category</span>
                <span className="info-value">{item.category}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{item.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time</span>
                <span className="info-value">{item.time}</span>
              </div>
              {item.color && (
                <div className="info-item">
                  <span className="info-label">Color</span>
                  <span className="info-value">{item.color}</span>
                </div>
              )}
              {item.brand && (
                <div className="info-item">
                  <span className="info-label">Brand</span>
                  <span className="info-value">{item.brand}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className={`status-badge status-${item.status}`}>
                  {item.status}
                </span>
              </div>
            </div>

            {item.identifyingFeatures && (
              <div className="info-section">
                <h3>Identifying Features</h3>
                <p>{item.identifyingFeatures}</p>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="info-section">
                <h3>Tags</h3>
                <div className="tags-list">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {currentUser && item.status === 'available' && (
              <div className="action-buttons">
                {item.type === 'lost' ? (
                  <button
                    className="btn btn-primary btn-large"
                    onClick={() => setShowClaimModal(true)}
                  >
                    I Found This Item
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-large"
                    onClick={() => setShowClaimModal(true)}
                  >
                    This Is My Item
                  </button>
                )}
              </div>
            )}

            {!currentUser && (
              <div className="alert alert-info">
                <p>Please log in to submit a claim for this item</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="details-sidebar">
          {/* Possible Matches */}
          {possibleMatches.length > 0 && (
            <div className="matches-card">
              <h3>Possible Matches</h3>
              <div className="matches-list">
                {possibleMatches.map(match => (
                  <div key={match.id} className="match-item">
                    <div className="match-header">
                      <span className="match-title">{match.title}</span>
                      <span className="match-percentage">{match.matchPercentage}%</span>
                    </div>
                    <div className="match-details">
                      {match.category === item.category && <span className="match-check">✓ Category</span>}
                      {match.location === item.location && <span className="match-check">✓ Location</span>}
                      {match.color === item.color && <span className="match-check">✓ Color</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reporter Info */}
          <div className="reporter-card">
            <h3>Reporter</h3>
            <p>Report ID: {item.id}</p>
            <p className="text-sm text-muted">
              Reported on {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        </aside>
      </div>

      {/* Claim Modal */}
      <Modal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        title={item.type === 'lost' ? 'Claim Found Item' : 'Claim Lost Item'}
        size="md"
      >
        <form onSubmit={handleClaimSubmit}>
          <div className="form-group">
            <label>Where did you {item.type === 'lost' ? 'lose' : 'find'} it?</label>
            <input
              type="text"
              value={claimData.location}
              onChange={(e) => setClaimData({...claimData, location: e.target.value})}
              placeholder="Location details"
              required
            />
          </div>

          <div className="form-group">
            <label>Describe a unique identifying feature</label>
            <textarea
              value={claimData.identifyingFeature}
              onChange={(e) => setClaimData({...claimData, identifyingFeature: e.target.value})}
              placeholder="Specific marks, colors, or features that prove ownership"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>{item.type === 'lost' ? 'What was inside it?' : 'What\'s inside?'}</label>
            <textarea
              value={claimData.contents}
              onChange={(e) => setClaimData({...claimData, contents: e.target.value})}
              placeholder="Contents and details"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Additional details or proof</label>
            <textarea
              value={claimData.additionalDetails}
              onChange={(e) => setClaimData({...claimData, additionalDetails: e.target.value})}
              placeholder="Any other information that helps verify ownership"
            ></textarea>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowClaimModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Claim
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
