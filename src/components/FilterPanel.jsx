import { CATEGORIES, LOCATIONS } from '../data/initialData';
import './FilterPanel.css';

export default function FilterPanel({ filters, onChange }) {
  const handleFilterChange = (key, value) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  const handleMultiSelect = (key, value) => {
    const currentValues = filters[key] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handleFilterChange(key, newValues);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button
          className="filter-reset"
          onClick={() => onChange({
            type: [],
            category: [],
            location: [],
            status: []
          })}
        >
          Reset
        </button>
      </div>

      {/* Type Filter */}
      <div className="filter-group">
        <label className="filter-label">Type</label>
        <div className="filter-options">
          {['lost', 'found'].map(type => (
            <label key={type} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.type && filters.type.includes(type)}
                onChange={() => handleMultiSelect('type', type)}
              />
              <span className="checkbox-label">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          multiple
          className="filter-select"
          value={filters.category || []}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            handleFilterChange('category', selected);
          }}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <p className="filter-hint">Hold Ctrl/Cmd to select multiple</p>
      </div>

      {/* Location Filter */}
      <div className="filter-group">
        <label className="filter-label">Location</label>
        <select
          multiple
          className="filter-select"
          value={filters.location || []}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            handleFilterChange('location', selected);
          }}
        >
          {LOCATIONS.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <p className="filter-hint">Hold Ctrl/Cmd to select multiple</p>
      </div>

      {/* Status Filter */}
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <div className="filter-options">
          {['available', 'resolved'].map(status => (
            <label key={status} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.status && filters.status.includes(status)}
                onChange={() => handleMultiSelect('status', status)}
              />
              <span className="checkbox-label">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.type?.length > 0 || filters.category?.length > 0 || 
        filters.location?.length > 0 || filters.status?.length > 0) && (
        <div className="active-filters">
          <div className="filter-chips">
            {filters.type?.map(t => (
              <span key={t} className="filter-chip">
                {t}
                <button onClick={() => handleMultiSelect('type', t)}>×</button>
              </span>
            ))}
            {filters.category?.map(c => (
              <span key={c} className="filter-chip">
                {c}
                <button onClick={() => handleMultiSelect('category', c)}>×</button>
              </span>
            ))}
            {filters.location?.map(l => (
              <span key={l} className="filter-chip">
                {l}
                <button onClick={() => handleMultiSelect('location', l)}>×</button>
              </span>
            ))}
            {filters.status?.map(s => (
              <span key={s} className="filter-chip">
                {s}
                <button onClick={() => handleMultiSelect('status', s)}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
