import { getNotifications, addNotification } from '../data/initialData';
import './NotificationPanel.css';

export default function NotificationPanel() {
  const notifications = getNotifications();

  const markAsRead = (notificationId) => {
    const notifs = getNotifications();
    const notif = notifs.find(n => n.id === notificationId);
    if (notif) {
      notif.read = true;
      localStorage.setItem('notifications', JSON.stringify(notifs));
      window.location.reload();
    }
  };

  const markAllAsRead = () => {
    const notifs = getNotifications();
    notifs.forEach(n => n.read = true);
    localStorage.setItem('notifications', JSON.stringify(notifs));
    window.location.reload();
  };

  const deleteNotification = (notificationId) => {
    const notifs = getNotifications();
    const filtered = notifs.filter(n => n.id !== notificationId);
    localStorage.setItem('notifications', JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <div className="notification-panel">
      <div className="notification-panel-header">
        <h1>Notifications</h1>
        {notifications.some(n => !n.read) && (
          <button
            className="btn btn-small btn-outline"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">🔔</p>
          <h3>No notifications yet</h3>
          <p>You'll see notifications here when there's activity on your items and claims.</p>
        </div>
      ) : (
        <div className="notification-list-full">
          {notifications
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(notif => (
              <div
                key={notif.id}
                className={`notification-item-full ${notif.read ? '' : 'unread'}`}
              >
                <div className="notification-content">
                  <p className="notification-message">{notif.message}</p>
                  <span className="notification-time">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="notification-actions">
                  {!notif.read && (
                    <button
                      className="icon-btn"
                      onClick={() => markAsRead(notif.id)}
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteNotification(notif.id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
