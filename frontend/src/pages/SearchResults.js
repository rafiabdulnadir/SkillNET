import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SkillCard from '../components/SkillCard';
import SkillFilter from '../components/SkillFilter';
import Pagination, { usePagination } from '../components/Pagination';
import LoadingSpinner, { SkillCardSkeleton } from '../components/LoadingSpinner';

// Mock search results
  const mockSkills = [
    {
      id: 1,
      title: 'React Development Masterclass',
      description: 'Learn modern React with hooks, context, and advanced patterns',
      category: 'Web Development',
      teacher: 'Sarah Chen',
      teacherAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 127,
      price: 'Free',
      duration: '2-3 hours',
      level: 'Intermediate',
      tags: ['React', 'JavaScript', 'Frontend'],
      location: 'San Francisco, CA',
      availabilityType: 'Online'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      description: 'Master Python programming for data analysis and machine learning',
      category: 'Data Science',
      teacher: 'Marcus Johnson',
      teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 89,
      price: 'Exchange',
      duration: '4-5 hours',
      level: 'Beginner',
      tags: ['Python', 'Data Science', 'ML'],
      location: 'New York, NY',
      availabilityType: 'In-person'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Create beautiful and user-friendly interfaces',
      category: 'Design',
      teacher: 'Emily Rodriguez',
      teacherAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 156,
      price: 'Free',
      duration: '3-4 hours',
      level: 'Beginner',
      tags: ['Design', 'UI', 'UX'],
      location: 'Los Angeles, CA',
      availabilityType: 'Both'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      description: 'Learn effective digital marketing techniques and strategies',
      category: 'Marketing',
      teacher: 'Lisa Thompson',
      teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 45,
      price: 'Paid',
      duration: '2-3 hours',
      level: 'Intermediate',
      tags: ['Marketing', 'Strategy', 'Digital'],
      location: 'Chicago, IL',
      availabilityType: 'Online'
    },
    {
      id: 5,
      title: 'Photography Basics',
      description: 'Learn the fundamentals of photography and composition',
      category: 'Photography',
      teacher: 'David Kim',
      teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 78,
      price: 'Exchange',
      duration: '3-4 hours',
      level: 'Beginner',
      tags: ['Photography', 'Composition', 'Basics'],
      location: 'Seattle, WA',
      availabilityType: 'In-person'
    },
    {
      id: 6,
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js and Express',
      category: 'Web Development',
      teacher: 'Alex Wilson',
      teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 92,
      price: 'Free',
      duration: '4-5 hours',
      level: 'Advanced',
      tags: ['Node.js', 'Backend', 'Express'],
      location: 'Austin, TX',
      availabilityType: 'Online'
    }
  ];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    skillLevel: '',
    availabilityType: '',
    location: '',
    priceRange: '',
    rating: ''
  });
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination hook
  const {
    currentPage,
    totalPages,
    goToPage,
    pageSize
  } = usePagination({
    totalItems: totalResults,
    itemsPerPage: 12,
    initialPage: 1
  });

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const category = params.get('category') || '';
    const level = params.get('level') || '';
    const type = params.get('type') || '';
    const locationParam = params.get('location') || '';
    const page = parseInt(params.get('page')) || 1;

    setSearchQuery(query);
    setFilters({
      search: query,
      category,
      skillLevel: level,
      availabilityType: type,
      location: locationParam,
      priceRange: '',
      rating: ''
    });

    goToPage(page);
  }, [location.search, goToPage]);

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filter mock data based on search criteria
        let filteredSkills = mockSkills;
        
        if (filters.search) {
          filteredSkills = filteredSkills.filter(skill =>
            skill.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            skill.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            skill.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
          );
        }
        
        if (filters.category) {
          filteredSkills = filteredSkills.filter(skill =>
            skill.category.toLowerCase() === filters.category.toLowerCase()
          );
        }
        
        if (filters.skillLevel) {
          filteredSkills = filteredSkills.filter(skill =>
            skill.level.toLowerCase() === filters.skillLevel.toLowerCase()
          );
        }
        
        if (filters.availabilityType) {
          filteredSkills = filteredSkills.filter(skill =>
            skill.availabilityType.toLowerCase() === filters.availabilityType.toLowerCase() ||
            skill.availabilityType.toLowerCase() === 'both'
          );
        }

        setTotalResults(filteredSkills.length);
        
        // Simulate pagination
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setSkills(filteredSkills.slice(startIndex, endIndex));
        
      } catch (err) {
        setError('Failed to load search results');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [filters, currentPage, pageSize]);

  // Update URL when filters change
  const updateURL = (newFilters, page = 1) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('q', newFilters.search);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.skillLevel) params.set('level', newFilters.skillLevel);
    if (newFilters.availabilityType) params.set('type', newFilters.availabilityType);
    if (newFilters.location) params.set('location', newFilters.location);
    if (page > 1) params.set('page', page.toString());

    const newURL = `/search${params.toString() ? '?' + params.toString() : ''}`;
    navigate(newURL, { replace: true });
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    goToPage(1); // Reset to first page when filters change
    updateURL(newFilters, 1);
  };

  // Handle search
  const handleSearch = (query) => {
    const newFilters = { ...filters, search: query };
    handleFilterChange(newFilters);
  };

  // Handle page change
  const handlePageChange = (page) => {
    goToPage(page);
    updateURL(filters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get search summary
  const getSearchSummary = () => {
    if (filters.search && filters.category) {
      return `"${filters.search}" in ${filters.category}`;
    } else if (filters.search) {
      return `"${filters.search}"`;
    } else if (filters.category) {
      return `${filters.category} skills`;
    }
    return 'all skills';
  };

  if (loading && skills.length === 0) {
    return (
      <div className="search-results-loading">
        <div className="container">
          <div className="search-header">
            <h1>Search Results</h1>
            <div className="search-bar-skeleton"></div>
          </div>
          <div className="skills-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          <h1 className="search-title">Search Results</h1>
          <div className="search-bar-container">
            <SearchBar
              placeholder="Search skills, categories, or teachers..."
              onSearch={handleSearch}
              initialValue={searchQuery}
              size="medium"
            />
          </div>
        </div>

        {/* Search Summary */}
        <div className="search-summary">
          <div className="search-info">
            <h2 className="results-title">
              {loading ? 'Searching...' : `${totalResults.toLocaleString()} results found`}
            </h2>
            <p className="results-subtitle">
              Showing results for {getSearchSummary()}
            </p>
          </div>
          
          {!loading && totalResults > 0 && (
            <div className="sort-options">
              <label htmlFor="sort-select">Sort by:</label>
              <select id="sort-select" className="sort-select">
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="search-content">
          {/* Filters Sidebar */}
          <div className="search-filters">
            <SkillFilter
              onFilterChange={handleFilterChange}
              currentFilters={filters}
              showAdvanced={true}
            />
          </div>

          {/* Results Content */}
          <div className="search-results-content">
            {error && (
              <div className="search-error">
                <div className="error-icon">⚠️</div>
                <h3>Search Error</h3>
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn btn-primary"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && skills.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No skills found</h3>
                <p>
                  We couldn't find any skills matching your search for {getSearchSummary()}.
                </p>
                <div className="no-results-suggestions">
                  <h4>Try:</h4>
                  <ul>
                    <li>Checking your spelling</li>
                    <li>Using different keywords</li>
                    <li>Removing some filters</li>
                    <li>Browsing popular categories</li>
                  </ul>
                </div>
                <div className="no-results-actions">
                  <button 
                    onClick={() => handleFilterChange({ ...filters, search: '', category: '', skillLevel: '', availabilityType: '' })}
                    className="btn btn-outline"
                  >
                    Clear Filters
                  </button>
                  <a href="/explore" className="btn btn-primary">
                    Explore All Skills
                  </a>
                </div>
              </div>
            )}

            {!error && skills.length > 0 && (
              <>
                {/* Results Grid */}
                <div className="results-grid">
                  {skills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>

                {/* Loading More Results */}
                {loading && (
                  <div className="loading-more">
                    <LoadingSpinner size="medium" />
                    <p>Loading more results...</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="search-pagination">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={totalResults}
                      itemsPerPage={pageSize}
                      onPageChange={handlePageChange}
                      showInfo={true}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Search Tips */}
        {!loading && totalResults > 0 && (
          <div className="search-tips">
            <h3>💡 Search Tips</h3>
            <div className="tips-grid">
              <div className="tip">
                <strong>Use specific keywords:</strong> Try "React hooks" instead of just "React"
              </div>
              <div className="tip">
                <strong>Filter by location:</strong> Find skills available in your area
              </div>
              <div className="tip">
                <strong>Check skill level:</strong> Match your experience level
              </div>
              <div className="tip">
                <strong>Browse categories:</strong> Explore related skills you might like
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
