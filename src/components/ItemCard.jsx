import { Link } from 'react-router-dom';
import './ItemCard.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=80';

export default function ItemCard({ item }) {
  const typeClass = item.type === 'lost' ? 'badge-lost' : 'badge-found';
  const typeLabel = item.type === 'lost' ? 'Lost' : 'Found';
  const statusClass = item.status === 'resolved' ? 'resolved' : 'available';

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/items/${item.id}`} className="item-card-link">
      <div className={`item-card ${statusClass}`}>
        <div className="item-image-container">
          <img
            src={item.imageUrl || item.image || FALLBACK_IMAGE}
            alt={item.title}
            className="item-image"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
          <span className={`badge ${typeClass}`}>
            {typeLabel}
          </span>
          {item.status === 'resolved' && (
            <div className="resolved-overlay">
              <span>✓ Resolved</span>
            </div>
          )}
        </div>

        <div className="item-content">
          <h3 className="item-title">{item.title}</h3>

          <div className="item-meta">
            <span className="item-category">{item.category}</span>
            <span className="item-date">{formatDate(item.date)}</span>
          </div>

          <div className="item-details">
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span className="detail-text">{item.location}</span>
            </div>
            {item.color && (
              <div className="detail-item">
                <span className="detail-icon">🎨</span>
                <span className="detail-text">{item.color}</span>
              </div>
            )}
          </div>

          <p className="item-description">
            {item.description.length > 80
              ? item.description.substring(0, 80) + '...'
              : item.description}
          </p>

          <div className="item-footer">
            {item.tags && item.tags.length > 0 && (
              <div className="item-tags">
                {item.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            <span className="view-details">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
