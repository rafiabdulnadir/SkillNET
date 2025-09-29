import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for suggestions - moved outside component to prevent recreation
const mockSuggestions = [
  { id: 1, type: 'skill', title: 'React Development', category: 'Web Development', matches: 245 },
  { id: 2, type: 'skill', title: 'Python Programming', category: 'Programming', matches: 189 },
  { id: 3, type: 'skill', title: 'UI/UX Design', category: 'Design', matches: 156 },
  { id: 4, type: 'skill', title: 'Digital Marketing', category: 'Marketing', matches: 134 },
  { id: 5, type: 'skill', title: 'Data Science', category: 'Analytics', matches: 98 },
  { id: 6, type: 'category', title: 'Web Development', matches: 567 },
  { id: 7, type: 'category', title: 'Design', matches: 423 },
  { id: 8, type: 'teacher', title: 'Sarah Chen', specialty: 'React & Frontend', rating: 4.9 },
  { id: 9, type: 'teacher', title: 'Marcus Johnson', specialty: 'Python & Data Science', rating: 4.8 }
];

const SearchBar = ({
  placeholder = 'Search skills, categories, or teachers...',
  onSearch,
  onSuggestionSelect,
  showSuggestions = true,
  autoFocus = false,
  className = '',
  size = 'medium',
  variant = 'default',
  debounceMs = 300,
  minSearchLength = 2,
  maxSuggestions = 8,
  clearOnSelect = false,
  showSearchIcon = true,
  showClearButton = true,
  disabled = false,
  loading = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();



  // Fetch suggestions based on query
  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (searchQuery.length < minSearchLength) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Filter mock suggestions based on query
      const filtered = mockSuggestions
        .filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.specialty && item.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, maxSuggestions);
      
      setSuggestions(filtered);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [minSearchLength, maxSuggestions]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (query && showSuggestions) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, fetchSuggestions, debounceMs, showSuggestions]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setShowSuggestionsList(true);
  };

  // Handle search submission
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setShowSuggestionsList(false);
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Default behavior: navigate to search results
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    const searchValue = suggestion.title;
    
    if (clearOnSelect) {
      setQuery('');
    } else {
      setQuery(searchValue);
    }
    
    setShowSuggestionsList(false);
    setSelectedIndex(-1);

    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      handleSearch(searchValue);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestionsList || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      
      case 'Escape':
        setShowSuggestionsList(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      
      default:
        break;
    }
  };

  // Handle input focus
  const handleFocus = () => {
    if (query && suggestions.length > 0) {
      setShowSuggestionsList(true);
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestionsList(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestionsList(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Size classes
  const sizeClasses = {
    small: 'search-bar-small',
    medium: 'search-bar-medium',
    large: 'search-bar-large',
  };

  // Variant classes
  const variantClasses = {
    default: 'search-bar-default',
    minimal: 'search-bar-minimal',
    rounded: 'search-bar-rounded',
  };

  // Get suggestion icon
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'skill':
        return '🎯';
      case 'category':
        return '📚';
      case 'teacher':
        return '👨‍🏫';
      default:
        return '🔍';
    }
  };

  return (
    <div className={`search-bar ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      <div className="search-input-container">
        {showSearchIcon && (
          <div className="search-icon">
            🔍
          </div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="search-input"
          disabled={disabled || loading}
          autoComplete="off"
          role="combobox"
          aria-expanded={showSuggestionsList}
          aria-controls="search-suggestions-list"
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />

        {(loading || isLoading) && (
          <div className="search-loading">
            <div className="loading-spinner small"></div>
          </div>
        )}

        {showClearButton && query && !loading && !isLoading && (
          <button
            onClick={handleClear}
            className="search-clear-button"
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}

        <button
          onClick={() => handleSearch()}
          className="search-submit-button"
          disabled={disabled || loading || !query.trim()}
          aria-label="Search"
          type="button"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id="search-suggestions-list"
          className="search-suggestions"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionSelect(suggestion)}
              className={`search-suggestion ${index === selectedIndex ? 'selected' : ''}`}
              role="option"
              aria-selected={index === selectedIndex}
              type="button"
            >
              <div className="suggestion-icon">
                {getSuggestionIcon(suggestion.type)}
              </div>
              
              <div className="suggestion-content">
                <div className="suggestion-title">
                  {suggestion.title}
                </div>
                
                {suggestion.category && (
                  <div className="suggestion-meta">
                    in {suggestion.category}
                  </div>
                )}
                
                {suggestion.specialty && (
                  <div className="suggestion-meta">
                    {suggestion.specialty}
                  </div>
                )}
                
                {suggestion.matches && (
                  <div className="suggestion-matches">
                    {suggestion.matches} matches
                  </div>
                )}
                
                {suggestion.rating && (
                  <div className="suggestion-rating">
                    ⭐ {suggestion.rating}
                  </div>
                )}
              </div>
              
              <div className="suggestion-type">
                {suggestion.type}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showSuggestionsList && query.length >= minSearchLength && suggestions.length === 0 && !isLoading && (
        <div className="search-no-results">
          <div className="no-results-icon">🔍</div>
          <div className="no-results-text">
            No suggestions found for "{query}"
          </div>
          <button
            onClick={() => handleSearch()}
            className="btn btn-outline btn-small"
            type="button"
          >
            Search anyway
          </button>
        </div>
      )}
    </div>
  );
};

// Compact search bar for navbar
export const CompactSearchBar = (props) => {
  return (
    <SearchBar
      {...props}
      size="small"
      variant="minimal"
      showClearButton={false}
      className={`compact-search ${props.className || ''}`}
    />
  );
};

// Hero search bar for home page
export const HeroSearchBar = (props) => {
  return (
    <SearchBar
      {...props}
      size="large"
      variant="rounded"
      autoFocus={true}
      className={`hero-search ${props.className || ''}`}
    />
  );
};

export default SearchBar;
