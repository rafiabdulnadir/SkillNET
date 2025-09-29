import React from 'react';
import { Link } from 'react-router-dom';
import SkillCard from './SkillCard';
import SkillFilter from './SkillFilter';
import LoadingSpinner, { SkillCardSkeleton } from './LoadingSpinner';

const SkillsSection = ({
  skills,
  filters,
  pagination,
  loading,
  loadingMore,
  error,
  isAuthenticated,
  onFilterChange,
  onLoadMore
}) => {
  if (loading) {
    return (
      <div className="skills-section">
        <div className="skills-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="skills-section">
      {/* Filter Section */}
      <SkillFilter 
        onFilterChange={onFilterChange}
        currentFilters={filters}
      />

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">
          {filters.search || filters.category || filters.skillLevel || filters.availabilityType || filters.location
            ? 'Filtered Skills'
            : 'Available Skills'
          }
        </h2>
        <div className="results-count">
          {pagination.totalCount} skill{pagination.totalCount !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Skills Grid or No Results */}
      {skills.length === 0 ? (
        <div className="no-skills">
          <div className="no-skills-icon">🔍</div>
          <h3>No skills found</h3>
          <p>Try adjusting your filters or search terms to find more skills.</p>
          {isAuthenticated && (
            <Link to="/add-skill" className="btn btn-primary">
              Be the first to share this skill!
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          {/* Load More Button */}
          {pagination.page < pagination.totalPages && (
            <div className="load-more-section">
              <button 
                className="btn btn-outline load-more-btn"
                onClick={onLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <LoadingSpinner size="small" color="primary" />
                    Loading more...
                  </>
                ) : (
                  `Load More Skills (${pagination.totalCount - skills.length} remaining)`
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SkillsSection;
