import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getItems } from '../data/initialData';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import './Home.css';

const benefits = [
  ['community', 'Built for the university community'],
  ['report', 'Easy lost & found reporting'],
  ['search', 'Fast search and filtering'],
  ['verify', 'Ownership verification']
];

function BenefitIcon({ type }) {
  const paths = {
    community: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 19c.5-3 2.4-4.5 5.5-4.5s5 1.5 5.5 4.5M15 14.5c2.8.1 4.5 1.5 5 4.5" /></>,
    report: <><path d="M5 4.5h14v15H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    search: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4.5 4.5M8 10.5h5M10.5 8v5" /></>,
    verify: <><path d="M12 3.5 19 6v5.5c0 4.2-2.8 7.3-7 9-4.2-1.7-7-4.8-7-9V6z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[type]}</svg>;
}

export default function Home() {
  const items = getItems();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const lostCount = items.filter(item => item.type === 'lost').length;
  const foundCount = items.filter(item => item.type === 'found').length;
  const resolvedCount = items.filter(item => item.status === 'resolved').length;
  const recentItems = [...items]
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
    .slice(0, 4);

  const handleSearch = () => {
    const query = searchValue.trim();
    navigate(query ? `/items?search=${encodeURIComponent(query)}` : '/items');
  };

  return (
    <div className="home">
      <section className="hero-section">
        <div className="content-container">
          <div className="hero-content">
            <h1 className="hero-title">Lost Something? Found Something?</h1>
            <p className="hero-subtitle">Let's Reunite It</p>
            <p className="hero-description">
              The University's trusted Lost & Found platform. Report lost or found items,
              search for matches, and reunite belongings with their owners.
            </p>
            <div className="hero-buttons">
              <Link to="/report?type=lost" className="btn btn-primary btn-large">
                Report Lost Item
              </Link>
              <Link to="/report?type=found" className="btn btn-secondary btn-large">
                Report Found Item
              </Link>
              <Link to="/items" className="btn btn-outline btn-large">
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-search" aria-labelledby="quick-search-title">
        <div className="content-container quick-search-inner">
          <div>
            <p className="section-kicker">Find it faster</p>
            <h2 id="quick-search-title">Looking for something?</h2>
            <p>Search reported items by name, location, category, or description.</p>
          </div>
          <div className="home-search">
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
              placeholder="Search lost & found items..."
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="content-container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Report</h3>
              <p>Report a lost or found item with clear details.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3>Search</h3>
              <p>Browse reported items and find possible matches.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3>Verify</h3>
              <p>Verify ownership before claiming an item.</p>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <h3>Reunite</h3>
              <p>Safely connect the owner and finder.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="why-portal">
        <div className="content-container">
          <div className="section-heading-row why-heading">
            <div>
              <p className="section-kicker">Why use the portal</p>
              <h2>Designed for campus life</h2>
            </div>
            <p className="section-heading-copy">A focused way for students, staff, and faculty to get belongings back where they belong.</p>
          </div>
          <div className="benefits-grid">
            {benefits.map(([icon, label]) => (
              <div className="benefit" key={label}>
                <span className="benefit-icon"><BenefitIcon type={icon} /></span>
                <h3>{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="statistics">
        <div className="content-container">
          <h2>Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{items.length}</div>
              <div className="stat-label">Total Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{lostCount}</div>
              <div className="stat-label">Lost Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{foundCount}</div>
              <div className="stat-label">Found Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{resolvedCount}</div>
              <div className="stat-label">Successfully Resolved</div>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-items">
        <div className="content-container">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">Latest activity</p>
              <h2>Recently Reported</h2>
            </div>
            <Link to="/items" className="text-link">View All <span aria-hidden="true">→</span></Link>
          </div>
          {recentItems.length > 0 ? (
            <div className="recent-grid">
              {recentItems.map(item => <ItemCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="recent-empty">No items have been reported yet.</div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="content-container cta-content">
          <div>
            <p className="section-kicker">Keep looking forward</p>
            <h2>Can't find your item?</h2>
            <p>Report it now and let the campus community help.</p>
          </div>
          <div className="cta-buttons">
            <Link to="/report?type=lost" className="btn btn-primary btn-large">Report Lost Item</Link>
            <Link to="/items" className="btn btn-outline btn-large">Browse Items</Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-main">
            <div className="footer-column footer-brand">
              <div className="brand-header">
                <span className="footer-brand-mark" aria-hidden="true">🔍</span>
                <h3>Lost &amp; Found Portal</h3>
              </div>
              <p>
                A secure campus platform to report, discover, and reunite lost items for students,
                staff, and faculty.
              </p>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/items">Browse Items</Link></li>
                <li><Link to="/report?type=lost">Report Lost Item</Link></li>
                <li><Link to="/report?type=found">Report Found Item</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Help &amp; Support</h4>
              <ul>
                <li><Link to="/support#help-center">Help Center</Link></li>
                <li><Link to="/support#safety-guidelines">Safety Guidelines</Link></li>
                <li><Link to="/support#faq">FAQ</Link></li>
                <li><Link to="/support#contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-column footer-contact">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <span className="contact-label">Campus Office</span>
                  <Link to="/support#contact">Student Services Building</Link>
                </li>
                <li>
                  <span className="contact-label">Email</span>
                  <a href="mailto:help@lostandfound.edu">help@lostandfound.edu</a>
                </li>
                <li>
                  <span className="contact-label">Phone</span>
                  <a href="tel:+15551234567">+1 (555) 123-4567</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <span>© 2026 Lost &amp; Found Portal. University Campus.</span>
              <span>Made with ❤️ for students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
