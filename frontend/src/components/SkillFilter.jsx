import React, { useState, useEffect } from 'react';
import api from '../utils/api.jsx';

const SkillFilter = ({ onFilterChange, currentFilters }) => {
  const [categories, setCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    skillLevel: '',
    availabilityType: '',
    location: '',
    ...currentFilters
  });

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const availabilityTypes = ['Online', 'In-Person', 'Both'];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilters(prev => ({ ...prev, ...currentFilters }));
  }, [currentFilters]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/skills/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      skillLevel: '',
      availabilityType: '',
      location: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="skill-filter">
      <div className="filter-header">
        <div className="filter-title">
          <h3>🔍 Find Skills</h3>
          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All
            </button>
          )}
        </div>
        <button 
          className="filter-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '▲ Less Filters' : '▼ More Filters'}
        </button>
      </div>

      <div className="filter-content">
        {/* Search Input - Always Visible */}
        <div className="filter-group search-group">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search skills, users, or descriptions..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Quick Filters - Always Visible */}
        <div className="quick-filters">
          <div className="filter-group">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category}>
                  {cat.category} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filters.availabilityType}
              onChange={(e) => handleFilterChange('availabilityType', e.target.value)}
              className="filter-select"
            >
              <option value="">Any Format</option>
              {availabilityTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'In-Person' ? '🏢' : type === 'Online' ? '💻' : '🌐'} {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="expanded-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label className="filter-label">Skill Level</label>
                <select
                  value={filters.skillLevel}
                  onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
                  className="filter-select"
                >
                  <option value="">Any Level</option>
                  {skillLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Location</label>
                <input
                  type="text"
                  placeholder="Enter city or region..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>

            {/* Filter Tags */}
            {hasActiveFilters && (
              <div className="active-filters">
                <span className="active-filters-label">Active filters:</span>
                <div className="filter-tags">
                  {filters.search && (
                    <span className="filter-tag">
                      Search: "{filters.search}"
                      <button onClick={() => handleFilterChange('search', '')}>×</button>
                    </span>
                  )}
                  {filters.category && (
                    <span className="filter-tag">
                      Category: {filters.category}
                      <button onClick={() => handleFilterChange('category', '')}>×</button>
                    </span>
                  )}
                  {filters.skillLevel && (
                    <span className="filter-tag">
                      Level: {filters.skillLevel}
                      <button onClick={() => handleFilterChange('skillLevel', '')}>×</button>
                    </span>
                  )}
                  {filters.availabilityType && (
                    <span className="filter-tag">
                      Format: {filters.availabilityType}
                      <button onClick={() => handleFilterChange('availabilityType', '')}>×</button>
                    </span>
                  )}
                  {filters.location && (
                    <span className="filter-tag">
                      Location: {filters.location}
                      <button onClick={() => handleFilterChange('location', '')}>×</button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular Categories */}
      {!isExpanded && categories.length > 0 && (
        <div className="popular-categories">
          <span className="popular-label">Popular:</span>
          <div className="category-chips">
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat.category}
                className={`category-chip ${filters.category === cat.category ? 'active' : ''}`}
                onClick={() => handleFilterChange('category', 
                  filters.category === cat.category ? '' : cat.category
                )}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillFilter;

