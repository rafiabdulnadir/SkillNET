import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SkillCard from '../components/SkillCard';
import Pagination from '../components/Pagination';
import LoadingSpinner, { SkillCardSkeleton } from '../components/LoadingSpinner';

const Explore = () => {
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [newSkills, setNewSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredTeachers, setFeaturedTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('trending');

  // Mock data
  const mockTrendingSkills = [
    {
      id: 1,
      title: 'React Development',
      description: 'Learn modern React with hooks, context, and best practices',
      category: 'Web Development',
      teacher: 'Sarah Chen',
      teacherAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 127,
      price: 'Free',
      duration: '2-3 hours',
      level: 'Intermediate',
      trending: true,
      tags: ['React', 'JavaScript', 'Frontend']
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
      trending: true,
      tags: ['Python', 'Data Science', 'ML']
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
      trending: true,
      tags: ['Design', 'UI', 'UX']
    }
  ];

  const mockNewSkills = [
    {
      id: 4,
      title: 'Next.js Full Stack Development',
      description: 'Build modern web applications with Next.js and React',
      category: 'Web Development',
      teacher: 'David Kim',
      teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 23,
      price: 'Exchange',
      duration: '5-6 hours',
      level: 'Advanced',
      isNew: true,
      tags: ['Next.js', 'React', 'Full Stack']
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy',
      description: 'Learn effective digital marketing techniques and strategies',
      category: 'Marketing',
      teacher: 'Lisa Thompson',
      teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 45,
      price: 'Free',
      duration: '2-3 hours',
      level: 'Intermediate',
      isNew: true,
      tags: ['Marketing', 'Strategy', 'Digital']
    }
  ];

  const mockCategories = [
    { id: 1, name: 'Web Development', icon: '💻', skillCount: 245, color: 'blue' },
    { id: 2, name: 'Data Science', icon: '📊', skillCount: 189, color: 'green' },
    { id: 3, name: 'Design', icon: '🎨', skillCount: 156, color: 'purple' },
    { id: 4, name: 'Marketing', icon: '📈', skillCount: 134, color: 'orange' },
    { id: 5, name: 'Photography', icon: '📸', skillCount: 98, color: 'pink' },
    { id: 6, name: 'Music', icon: '🎵', skillCount: 87, color: 'red' },
    { id: 7, name: 'Languages', icon: '🌍', skillCount: 76, color: 'teal' },
    { id: 8, name: 'Cooking', icon: '👨‍🍳', skillCount: 65, color: 'yellow' }
  ];

  const mockFeaturedTeachers = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      title: 'Full Stack Developer',
      rating: 4.9,
      reviewCount: 127,
      skillsCount: 8,
      studentsCount: 234,
      specialties: ['React', 'Node.js', 'MongoDB'],
      bio: 'Passionate developer with 5+ years of experience in modern web technologies.'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      title: 'Data Scientist',
      rating: 4.8,
      reviewCount: 89,
      skillsCount: 6,
      studentsCount: 156,
      specialties: ['Python', 'Machine Learning', 'Statistics'],
      bio: 'Data science expert helping others unlock insights from data.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      title: 'UX Designer',
      rating: 4.7,
      reviewCount: 156,
      skillsCount: 5,
      studentsCount: 189,
      specialties: ['UI Design', 'User Research', 'Prototyping'],
      bio: 'Creating beautiful and intuitive user experiences for 7+ years.'
    }
  ];

  // Fetch explore data
  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTrendingSkills(mockTrendingSkills);
        setNewSkills(mockNewSkills);
        setCategories(mockCategories);
        setFeaturedTeachers(mockFeaturedTeachers);
      } catch (err) {
        setError('Failed to load explore data');
        console.error('Explore error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  const handleSearch = (query) => {
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  const handleCategoryClick = (category) => {
    window.location.href = `/search?category=${encodeURIComponent(category.name)}`;
  };

  if (loading) {
    return (
      <div className="explore-loading">
        <div className="container">
          <div className="explore-header">
            <h1>Explore Skills</h1>
            <div className="search-skeleton"></div>
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

  if (error) {
    return (
      <div className="explore-error">
        <div className="container">
          <h2>Unable to load explore page</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="explore-page">
      <div className="container">
        {/* Hero Section */}
        <div className="explore-hero">
          <h1 className="explore-title">Discover Amazing Skills</h1>
          <p className="explore-subtitle">
            Find trending skills, connect with expert teachers, and start your learning journey
          </p>
          
          <div className="explore-search">
            <SearchBar
              placeholder="What would you like to learn today?"
              onSearch={handleSearch}
              size="large"
              variant="rounded"
              autoFocus={false}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Explore skills organized by topic</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`category-card ${category.color}`}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-name">{category.name}</div>
                <div className="category-count">{category.skillCount} skills</div>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Tabs */}
        <div className="skills-tabs-section">
          <div className="skills-tabs">
            <button
              onClick={() => setActiveTab('trending')}
              className={`tab-button ${activeTab === 'trending' ? 'active' : ''}`}
            >
              🔥 Trending Skills
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
            >
              ✨ New Skills
            </button>
          </div>

          <div className="skills-content">
            {activeTab === 'trending' && (
              <div className="skills-grid">
                {trendingSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            )}

            {activeTab === 'new' && (
              <div className="skills-grid">
                {newSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </div>

          <div className="view-more-section">
            <Link to="/search" className="btn btn-outline">
              View All Skills
            </Link>
          </div>
        </div>

        {/* Featured Teachers */}
        <div className="featured-teachers-section">
          <div className="section-header">
            <h2 className="section-title">Featured Teachers</h2>
            <p className="section-subtitle">Learn from our top-rated skill experts</p>
          </div>
          
          <div className="teachers-grid">
            {featuredTeachers.map((teacher) => (
              <div key={teacher.id} className="teacher-card">
                <div className="teacher-avatar">
                  <img src={teacher.avatar} alt={teacher.name} />
                </div>
                
                <div className="teacher-info">
                  <h3 className="teacher-name">{teacher.name}</h3>
                  <p className="teacher-title">{teacher.title}</p>
                  
                  <div className="teacher-rating">
                    <span className="rating-stars">⭐ {teacher.rating}</span>
                    <span className="rating-count">({teacher.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="teacher-stats">
                    <div className="stat">
                      <span className="stat-number">{teacher.skillsCount}</span>
                      <span className="stat-label">Skills</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{teacher.studentsCount}</span>
                      <span className="stat-label">Students</span>
                    </div>
                  </div>
                  
                  <div className="teacher-specialties">
                    {teacher.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <p className="teacher-bio">{teacher.bio}</p>
                  
                  <div className="teacher-actions">
                    <button className="btn btn-primary btn-small">
                      View Profile
                    </button>
                    <button className="btn btn-outline btn-small">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="explore-cta">
          <div className="cta-content">
            <h2>Ready to Share Your Skills?</h2>
            <p>Join our community of teachers and help others learn something new</p>
            <div className="cta-actions">
              <Link to="/add-skill" className="btn btn-primary">
                Share a Skill
              </Link>
              <Link to="/register" className="btn btn-outline">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
