import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  const categories = [
    'Programming', 'Design', 'Languages', 'Music', 'Cooking', 
    'Fitness', 'Photography', 'Writing', 'Marketing', 'Other'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      // For demo purposes, we'll use mock data since the backend might not be fully connected
      const mockSkills = [
        {
          id: 1,
          title: 'React.js Development',
          description: 'Learn modern React development with hooks, context, and best practices.',
          category: 'Programming',
          skillLevel: 'Intermediate',
          user: { name: 'Alice Johnson', location: 'San Francisco, CA' },
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Spanish Conversation',
          description: 'Practice conversational Spanish with a native speaker.',
          category: 'Languages',
          skillLevel: 'Beginner',
          user: { name: 'Carlos Rodriguez', location: 'Madrid, Spain' },
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Guitar Lessons',
          description: 'Learn acoustic guitar from beginner to intermediate level.',
          category: 'Music',
          skillLevel: 'Beginner',
          user: { name: 'Emma Wilson', location: 'Nashville, TN' },
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          title: 'Digital Photography',
          description: 'Master digital photography techniques and photo editing.',
          category: 'Photography',
          skillLevel: 'Advanced',
          user: { name: 'David Chen', location: 'Los Angeles, CA' },
          createdAt: new Date().toISOString()
        },
        {
          id: 5,
          title: 'Italian Cooking',
          description: 'Learn authentic Italian recipes and cooking techniques.',
          category: 'Cooking',
          skillLevel: 'Intermediate',
          user: { name: 'Maria Rossi', location: 'Rome, Italy' },
          createdAt: new Date().toISOString()
        }
      ];

      setSkills(mockSkills);
      setError('');
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to load skills. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || skill.category === categoryFilter;
    const matchesLevel = !levelFilter || skill.skillLevel === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Discover Skills</h1>
        <p className="page-subtitle">
          Connect with talented people in your community and learn something new
        </p>
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.length === 0 ? (
          <div className="no-skills">
            <h3>No skills found</h3>
            <p>Try adjusting your search criteria or check back later for new skills.</p>
            {isAuthenticated && (
              <Link to="/add-skill" className="btn-primary">
                Add Your First Skill
              </Link>
            )}
          </div>
        ) : (
          filteredSkills.map(skill => (
            <div key={skill.id} className="skill-card">
              <div className="skill-header">
                <h3 className="skill-title">{skill.title}</h3>
                <div className="skill-badges">
                  <span className="category-badge">{skill.category}</span>
                  <span className="level-badge">{skill.skillLevel}</span>
                </div>
              </div>
              
              <div className="skill-body">
                <p className="skill-description">{skill.description}</p>
                
                <div className="skill-meta">
                  <div className="skill-user">
                    <strong>{skill.user.name}</strong>
                    <span className="user-location">{skill.user.location}</span>
                  </div>
                  <div className="skill-date">
                    Added {formatDate(skill.createdAt)}
                  </div>
                </div>
              </div>
              
              <div className="skill-footer">
                {isAuthenticated ? (
                  <div className="skill-actions">
                    <button className="btn-primary btn-sm">
                      Contact Teacher
                    </button>
                    <button className="btn-secondary btn-sm">
                      View Profile
                    </button>
                  </div>
                ) : (
                  <div className="skill-actions">
                    <Link to="/login" className="btn-primary btn-sm">
                      Login to Contact
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Call to Action */}
      {!isAuthenticated && (
        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Join our community to connect with skilled teachers and start your learning journey.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary btn-lg">
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

