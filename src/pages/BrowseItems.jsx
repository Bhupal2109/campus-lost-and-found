import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getItems } from '../data/initialData';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import './BrowseItems.css';

export default function BrowseItems() {
  const items = getItems();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = (searchParams.get('search') || '').trim();
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    type: [],
    category: [],
    location: [],
    status: []
  });

  const updateSearchQuery = (nextValue) => {
    const params = new URLSearchParams(searchParams);
    const cleanValue = nextValue.trim();

    if (cleanValue) {
      params.set('search', cleanValue);
    } else {
      params.delete('search');
    }

    setSearchParams(params, { replace: true });
  };

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => {
        const searchableText = [
          item.title,
          item.description,
          item.category,
          item.location,
          item.type,
          item.status,
          item.brand,
          item.color,
          item.tags,
          item.identifyingFeatures
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    // Type filter
    if (filters.type && filters.type.length > 0) {
      result = result.filter(item => filters.type.includes(item.type));
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      result = result.filter(item => filters.category.includes(item.category));
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      result = result.filter(item => filters.location.includes(item.location));
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      result = result.filter(item => filters.status.includes(item.status));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'updated':
        result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      default:
        break;
    }

    return result;
  }, [items, searchQuery, filters, sortBy]);

  return (
    <div className="browse-items-page">
      {/* Header */}
      <div className="browse-header">
        <h1>Browse Lost & Found Items</h1>
        <p>Search through all reported items and find what you're looking for</p>
      </div>

      {/* Search and Controls */}
      <div className="browse-controls">
        <div className="search-wrapper">
          <SearchBar
            value={searchQuery}
            onChange={updateSearchQuery}
            onSearch={() => updateSearchQuery(searchQuery)}
            placeholder="Search by item name, description, brand, or tags..."
          />
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="updated">Recently Updated</option>
          </select>
        </div>
      </div>

      <div className="browse-content">
        {/* Filter Sidebar */}
        <aside className="browse-sidebar">
          <FilterPanel filters={filters} onChange={setFilters} />
        </aside>

        {/* Items Grid */}
        <main className="browse-main">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">📭</p>
              <h3>No items found</h3>
              <p className="empty-description">
                {searchQuery || Object.values(filters).some(f => f && f.length > 0)
                  ? 'Try adjusting your search or filters'
                  : 'No items available yet'}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchParams({}, { replace: true });
                  setFilters({
                    type: [],
                    category: [],
                    location: [],
                    status: []
                  });
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="results-info">
                <p>Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="items-grid">
                {filteredItems.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
