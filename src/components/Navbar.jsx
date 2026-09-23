import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, getNotifications } from '../data/initialData';
import SearchBar from './SearchBar';
import './Navbar.css';

export default function Navbar({ theme, onToggleTheme }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const currentUser = getCurrentUser();
  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  const navigate = useNavigate();
  const location = useLocation();
  const themeToggleIcon = theme === 'dark' ? '☀️' : '🌙';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchValue(params.get('search') || '');
  }, [location.search]);

  const handleLogout = () => {
    localStorage.setItem('currentUser', JSON.stringify(null));
    navigate('/login');
  };

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();
    const nextUrl = trimmed ? `/items?search=${encodeURIComponent(trimmed)}` : '/items';
    navigate(nextUrl);
    setMobileMenuOpen(false);
  };

  const handleNotificationClick = (notification) => {
    const notifs = getNotifications();
    const notif = notifs.find(n => n.id === notification.id);
    if (notif) {
      notif.read = true;
      localStorage.setItem('notifications', JSON.stringify(notifs));
    }
    setNotificationsOpen(false);
    navigate('/notifications');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand" aria-label="Lost and Found home">
            <span className="brand-icon" aria-hidden="true">🔍</span>
            <span className="brand-text">Lost &amp; Found</span>
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          type="button"
        >
          ☰
        </button>

        <div className="navbar-center">
          <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-search">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                onSearch={handleSearchSubmit}
                placeholder="Search items..."
              />
            </div>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/items" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Browse Items
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Report Lost
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Report Found
            </NavLink>
          </div>
        </div>

        <div className="navbar-right">
          <div className="nav-tools">
            <button
              type="button"
              className="theme-toggle-btn"
              aria-label="Toggle theme"
              onClick={onToggleTheme}
            >
              {themeToggleIcon}
            </button>

            <div className="notification-container">
              <button
                className="notification-btn"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                type="button"
                aria-label="Open notifications"
              >
                <span aria-hidden="true">🔔</span>
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-muted" style={{ padding: '1rem', textAlign: 'center' }}>
                      No notifications
                    </p>
                  ) : (
                    <div className="notification-list">
                      {notifications.slice(-5).reverse().map(notif => (
                        <div
                          key={notif.id}
                          className={`notification-item ${notif.read ? '' : 'unread'}`}
                          onClick={() => handleNotificationClick(notif)}
                        >
                          <p>{notif.message}</p>
                          <span className="text-xs text-muted">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <Link to="/notifications" className="notification-view-all">
                    View All →
                  </Link>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="user-menu">
                <Link to="/profile" className="user-profile" title={currentUser.name}>
                  <span className="user-icon" aria-hidden="true">👤</span>
                  <span className="user-name">{currentUser.name}</span>
                </Link>
                <button className="btn btn-secondary btn-small navbar-logout-btn" onClick={handleLogout} type="button">
                  Logout
                </button>
                {currentUser.role === 'admin' && (
                  <Link to="/admin" className="btn btn-primary btn-small navbar-admin-btn">
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn btn-outline btn-small">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-small">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
