import './Support.css';

const supportSections = [
  {
    id: 'help-center',
    title: 'Help Center',
    description: 'Find practical guidance for reporting items, browsing listings, and managing claims.',
    items: [
      'Use Report Lost or Report Found to create a listing.',
      'Search by item name, description, brand, location, or tags.',
      'Open an item to review details and submit a claim.'
    ]
  },
  {
    id: 'safety-guidelines',
    title: 'Safety Guidelines',
    description: 'Keep every handoff safe and protect personal information throughout the process.',
    items: [
      'Meet in a public campus location for item handoffs.',
      'Confirm identifying details before returning an item.',
      'Do not share passwords, payment details, or unnecessary personal information.'
    ]
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    description: 'Common answers for using the campus Lost & Found portal.',
    items: [
      'You can browse reported items without signing in.',
      'A claim should include details that help verify ownership.',
      'Use your profile and My Items pages to manage your reports.'
    ]
  }
];

export default function Support() {
  return (
    <div className="support-page container">
      <header className="support-header">
        <p className="support-eyebrow">Support</p>
        <h1>How can we help?</h1>
        <p>Guidance for reporting, finding, and safely returning campus items.</p>
      </header>

      <div className="support-sections">
        {supportSections.map(section => (
          <section className="support-section card" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <ul>
              {section.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ))}

        <section className="support-section card" id="contact">
          <h2>Contact Us</h2>
          <p>Reach the campus Lost &amp; Found team for assistance with an item or claim.</p>
          <div className="support-contact-links">
            <a href="mailto:help@lostandfound.edu">help@lostandfound.edu</a>
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
            <span>Student Services Building</span>
          </div>
        </section>
      </div>
    </div>
  );
}
