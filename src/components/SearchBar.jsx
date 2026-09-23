import './SearchBar.css';

export default function SearchBar({ value, onChange, onSearch, placeholder = 'Search items...' }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && onSearch) {
      event.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="search-button"
        aria-label="Search items"
        onClick={onSearch}
      >
        <span className="search-icon">🔍</span>
      </button>
    </div>
  );
}
