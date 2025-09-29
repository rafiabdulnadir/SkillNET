import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import SkillCard from '../components/SkillCard';
import SkillFilter from '../components/SkillFilter';
import LoadingSpinner, { SkillCardSkeleton } from '../components/LoadingSpinner';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    skillLevel: '',
    availabilityType: '',
    location: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0
  });
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchSkills(true);
  }, [filters]);

  const fetchSkills = async (resetPagination = false) => {
    try {
      if (resetPagination) {
        setLoading(true);
        setPagination(prev => ({ ...prev, page: 1 }));
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams();
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      // Add pagination
      params.append('page', resetPagination ? '1' : pagination.page.toString());
      params.append('pageSize', pagination.pageSize.toString());

      const response = await api.get(`/skills?${params.toString()}`);
      
      if (resetPagination) {
        setSkills(response.data.skills || []);
      } else {
        setSkills(prev => [...prev, ...(response.data.skills || [])]);
      }
      
      setPagination({
        page: response.data.page || 1,
        pageSize: response.data.pageSize || 12,
        totalCount: response.data.totalCount || 0,
        totalPages: response.data.totalPages || 0
      });
      
    } catch (err) {
      // Fallback to mock data if API fails
      console.warn('API not available, using mock data:', err);
      const mockSkills = [
        {
          id: 1,
          title: 'React.js Development',
          description: 'Learn modern React development with hooks, context, and best practices. Perfect for beginners to intermediate developers.',
          category: 'Web Development',
          skillLevel: 'Intermediate',
          availabilityType: 'Online',
          user: { 
            id: 1,
            name: 'Alice Johnson', 
            location: 'San Francisco, CA',
            profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            averageRating: 4.8,
            totalRatings: 12
          },
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Python for Data Science',
          description: 'Comprehensive Python training for data analysis using pandas, numpy, and matplotlib. Includes real-world projects.',
          category: 'Data Science',
          skillLevel: 'Intermediate',
          availabilityType: 'Online',
          user: { 
            id: 2,
            name: 'Bob Smith', 
            location: 'New York, NY',
            profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            averageRating: 4.6,
            totalRatings: 8
          },
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          title: 'UI/UX Design Principles',
          description: 'Learn fundamental design principles, user research methods, and how to create intuitive user interfaces.',
          category: 'Design',
          skillLevel: 'Beginner',
          availabilityType: 'Both',
          user: { 
            id: 3,
            name: 'Carol Davis', 
            location: 'Austin, TX',
            profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            averageRating: 4.9,
            totalRatings: 15
          },
          createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 4,
          title: 'ASP.NET Core Development',
          description: 'Build robust web APIs and applications using ASP.NET Core, Entity Framework, and best practices.',
          category: 'Web Development',
          skillLevel: 'Advanced',
          availabilityType: 'In-Person',
          user: { 
            id: 4,
            name: 'David Wilson', 
            location: 'Seattle, WA',
            profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            averageRating: 4.7,
            totalRatings: 10
          },
          createdAt: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: 5,
          title: 'Digital Marketing Strategy',
          description: 'Learn search engine optimization techniques to improve website visibility and organic traffic.',
          category: 'Marketing',
          skillLevel: 'Intermediate',
          availabilityType: 'Both',
          user: { 
            id: 5,
            name: 'Emma Brown', 
            location: 'Boston, MA',
            profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            averageRating: 4.5,
            totalRatings: 7
          },
          createdAt: new Date(Date.now() - 345600000).toISOString()
        },
        {
          id: 6,
          title: 'Portrait Photography',
          description: 'Master the art of portrait photography including lighting, composition, and post-processing techniques.',
          category: 'Photography',
          skillLevel: 'Intermediate',
          availabilityType: 'In-Person',
          user: { 
            id: 6,
            name: 'Frank Miller', 
            location: 'Chicago, IL',
            profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            averageRating: 4.4,
            totalRatings: 6
          },
          createdAt: new Date(Date.now() - 432000000).toISOString()
        }
      ];

      // Apply filters to mock data
      let filteredMockSkills = mockSkills;
      
      if (filters.search) {
        filteredMockSkills = filteredMockSkills.filter(skill =>
          skill.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          skill.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          skill.user.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.category) {
        filteredMockSkills = filteredMockSkills.filter(skill => skill.category === filters.category);
      }
      
      if (filters.skillLevel) {
        filteredMockSkills = filteredMockSkills.filter(skill => skill.skillLevel === filters.skillLevel);
      }
      
      if (filters.availabilityType) {
        filteredMockSkills = filteredMockSkills.filter(skill => skill.availabilityType === filters.availabilityType);
      }
      
      if (filters.location) {
        filteredMockSkills = filteredMockSkills.filter(skill =>
          skill.user.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      setSkills(filteredMockSkills);
      setPagination({
        page: 1,
        pageSize: 12,
        totalCount: filteredMockSkills.length,
        totalPages: Math.ceil(filteredMockSkills.length / 12)
      });
      setError('');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const loadMoreSkills = () => {
    if (pagination.page < pagination.totalPages && !loadingMore) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
      fetchSkills(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Discover Skills</h1>
          <p className="page-subtitle">Connect with your community to learn and share skills</p>
        </div>
        
        <div className="skills-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn. Share. <span className="highlight">Grow.</span>
          </h1>
          <p className="hero-subtitle">
            Connect with your community to exchange skills and knowledge. 
            Find experts to learn from or share your expertise with others.
          </p>
          
          {!isAuthenticated && (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Sign In
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="hero-actions">
              <Link to="/add-skill" className="btn btn-primary btn-large">
                Share a Skill
              </Link>
            </div>
          )}
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">{pagination.totalCount}+</div>
            <div className="stat-label">Skills Available</div>
          </div>
          <div className="stat">
            <div className="stat-number">6+</div>
            <div className="stat-label">Expert Teachers</div>
          </div>
          <div className="stat">
            <div className="stat-number">10+</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <SkillFilter 
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {/* Skills Grid */}
      <div className="skills-section">
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
                  onClick={loadMoreSkills}
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

      {/* Call to Action */}
      {!isAuthenticated && (
        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to start learning?</h2>
            <p>Join our community of skill sharers and start your learning journey today.</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">
                Create Account
              </Link>
              <Link to="/login" className="btn btn-outline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

