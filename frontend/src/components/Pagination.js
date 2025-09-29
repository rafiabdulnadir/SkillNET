import React from 'react';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showInfo = true,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 7,
  size = 'medium',
  variant = 'default',
  className = '',
  disabled = false,
  loading = false,
}) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    // Add ellipsis and first page if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  // Handle page change
  const handlePageChange = (page) => {
    if (page === currentPage || disabled || loading) return;
    if (page < 1 || page > totalPages) return;
    
    onPageChange?.(page);
  };

  // Calculate item range for current page
  const getItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  };

  const { start, end } = getItemRange();

  // Size classes
  const sizeClasses = {
    small: 'pagination-small',
    medium: 'pagination-medium',
    large: 'pagination-large',
  };

  // Variant classes
  const variantClasses = {
    default: 'pagination-default',
    minimal: 'pagination-minimal',
    rounded: 'pagination-rounded',
  };

  return (
    <div className={`pagination-container ${className}`}>
      {/* Pagination Info */}
      {showInfo && (
        <div className="pagination-info">
          <span className="pagination-text">
            Showing {start.toLocaleString()} to {end.toLocaleString()} of {totalItems.toLocaleString()} results
          </span>
        </div>
      )}

      {/* Pagination Controls */}
      <nav 
        className={`pagination ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'disabled' : ''}`}
        role="navigation"
        aria-label="Pagination"
      >
        {/* First Page Button */}
        {showFirstLast && currentPage > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="pagination-button pagination-first"
            disabled={disabled || loading}
            aria-label="Go to first page"
            type="button"
          >
            <span className="pagination-icon">⏮️</span>
            <span className="pagination-label">First</span>
          </button>
        )}

        {/* Previous Page Button */}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button pagination-prev"
            disabled={currentPage === 1 || disabled || loading}
            aria-label="Go to previous page"
            type="button"
          >
            <span className="pagination-icon">⬅️</span>
            <span className="pagination-label">Previous</span>
          </button>
        )}

        {/* Page Numbers */}
        <div className="pagination-pages">
          {visiblePages.map((page, index) => {
            if (typeof page === 'string') {
              // Ellipsis
              return (
                <span
                  key={page}
                  className="pagination-ellipsis"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-button pagination-page ${
                  page === currentPage ? 'active' : ''
                }`}
                disabled={disabled || loading}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                type="button"
              >
                {loading && page === currentPage ? (
                  <div className="loading-spinner small"></div>
                ) : (
                  page
                )}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button pagination-next"
            disabled={currentPage === totalPages || disabled || loading}
            aria-label="Go to next page"
            type="button"
          >
            <span className="pagination-label">Next</span>
            <span className="pagination-icon">➡️</span>
          </button>
        )}

        {/* Last Page Button */}
        {showFirstLast && currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="pagination-button pagination-last"
            disabled={disabled || loading}
            aria-label="Go to last page"
            type="button"
          >
            <span className="pagination-label">Last</span>
            <span className="pagination-icon">⏭️</span>
          </button>
        )}
      </nav>

      {/* Page Size Selector (Optional) */}
      {/* This could be added as a separate component or prop */}
    </div>
  );
};

// Simple pagination component with minimal features
export const SimplePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      showInfo={false}
      showFirstLast={false}
      maxVisiblePages={5}
      variant="minimal"
      {...props}
    />
  );
};

// Compact pagination for mobile
export const CompactPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  return (
    <div className="compact-pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-outline btn-small"
        type="button"
      >
        ← Prev
      </button>
      
      <span className="compact-pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-outline btn-small"
        type="button"
      >
        Next →
      </button>
    </div>
  );
};

// Page size selector component
export const PageSizeSelector = ({
  pageSize = 10,
  onPageSizeChange,
  options = [10, 25, 50, 100],
  className = '',
}) => {
  return (
    <div className={`page-size-selector ${className}`}>
      <label htmlFor="page-size-select" className="page-size-label">
        Items per page:
      </label>
      <select
        id="page-size-select"
        value={pageSize}
        onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
        className="page-size-select"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

// Hook for pagination state management
export const usePagination = ({
  totalItems = 0,
  itemsPerPage = 10,
  initialPage = 1,
}) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);
  const [pageSize, setPageSize] = React.useState(itemsPerPage);

  const totalPages = Math.ceil(totalItems / pageSize);

  // Reset to first page when total items or page size changes
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const goToPage = React.useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = React.useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = React.useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const changePageSize = React.useCallback((newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Calculate offset for API calls
  const offset = (currentPage - 1) * pageSize;

  return {
    currentPage,
    totalPages,
    pageSize,
    offset,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export default Pagination;
