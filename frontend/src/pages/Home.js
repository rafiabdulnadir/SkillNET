import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import SkillsSection from '../components/SkillsSection';
import SuccessStories from '../components/SuccessStories';
import LocationPicker from '../components/LocationPicker';
import CTASection from '../components/CTASection';

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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const fetchSkills = useCallback(async (resetPagination = false) => {
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
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchSkills(true);
  }, [fetchSkills]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    if (location) {
      setFilters(prev => ({
        ...prev,
        location: location.address || `${location.lat},${location.lng}`
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        location: ''
      }));
    }
  };

  const loadMoreSkills = () => {
    if (pagination.page < pagination.totalPages && !loadingMore) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
      fetchSkills(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <HeroSection 
          isAuthenticated={isAuthenticated}
          totalSkills={pagination.totalCount}
        />
      </div>

      {/* Category Grid Section */}
      <CategoryGrid />

      <div className="container">
        {/* Location Picker Section */}
        <div className="location-section">
          <div className="location-header">
            <button
              className="btn btn-outline location-toggle"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
            >
              {showLocationPicker ? '📍 Hide Location Picker' : '📍 Find Skills Near You'}
            </button>
            {selectedLocation && (
              <div className="current-location">
                <span className="location-icon">📍</span>
                <span className="location-text">
                  Showing skills near: {selectedLocation.address}
                </span>
                <button
                  className="btn btn-small btn-outline"
                  onClick={() => handleLocationChange(null)}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          
          {showLocationPicker && (
            <LocationPicker
              onLocationChange={handleLocationChange}
              initialLocation={selectedLocation}
              className="home-location-picker"
            />
          )}
        </div>

        {/* Skills Section */}
        <SkillsSection
          skills={skills}
          filters={filters}
          pagination={pagination}
          loading={loading}
          loadingMore={loadingMore}
          error={error}
          isAuthenticated={isAuthenticated}
          onFilterChange={handleFilterChange}
          onLoadMore={loadMoreSkills}
        />
      </div>

      {/* Success Stories Section */}
      <SuccessStories />

      {/* Call to Action Section */}
      <div className="container">
        <CTASection isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default Home;
