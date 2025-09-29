import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const NotFound = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const popularPages = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Explore Skills', path: '/explore', icon: '🔍' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Add Skill', path: '/add-skill', icon: '➕' },
    { name: 'Messages', path: '/messages', icon: '💬' },
    { name: 'Profile', path: '/profile', icon: '👤' }
  ];

  const helpfulTips = [
    {
      icon: '🔍',
      title: 'Search for Skills',
      description: 'Use our search to find specific skills or topics you\'re interested in'
    },
    {
      icon: '📚',
      title: 'Browse Categories',
      description: 'Explore skills organized by categories like Web Development, Design, and more'
    },
    {
      icon: '👥',
      title: 'Connect with Teachers',
      description: 'Find expert teachers in your area or online to learn new skills'
    },
    {
      icon: '🎯',
      title: 'Share Your Skills',
      description: 'Become a teacher and share your expertise with the community'
    }
  ];

  return (
    <div className="not-found-page">
      <div className="container">
        {/* 404 Hero Section */}
        <div className="not-found-hero">
          <div className="error-illustration">
            <div className="error-code">404</div>
            <div className="error-emoji">🤔</div>
          </div>
          
          <div className="error-content">
            <h1 className="error-title">Oops! Page Not Found</h1>
            <p className="error-description">
              The page you're looking for seems to have wandered off. 
              Don't worry, even the best explorers sometimes take a wrong turn!
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="not-found-search">
          <h2>🔍 Search for What You Need</h2>
          <p>Maybe we can help you find what you were looking for:</p>
          
          <div className="search-container">
            <SearchBar
              placeholder="Search for skills, teachers, or topics..."
              onSearch={handleSearch}
              size="large"
              variant="rounded"
              autoFocus={true}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="not-found-actions">
          <div className="action-buttons">
            <button onClick={goBack} className="btn btn-outline">
              ← Go Back
            </button>
            <Link to="/" className="btn btn-primary">
              🏠 Go Home
            </Link>
            <Link to="/explore" className="btn btn-outline">
              🔍 Explore Skills
            </Link>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="popular-pages-section">
          <h2>📍 Popular Pages</h2>
          <p>Here are some pages you might be interested in:</p>
          
          <div className="popular-pages-grid">
            {popularPages.map((page, index) => (
              <Link
                key={index}
                to={page.path}
                className="popular-page-card"
              >
                <div className="page-icon">{page.icon}</div>
                <div className="page-name">{page.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="helpful-tips-section">
          <h2>💡 What You Can Do on SkillSwap</h2>
          <p>Since you're here, let us show you what makes our platform special:</p>
          
          <div className="tips-grid">
            {helpfulTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="support-section">
          <div className="support-card">
            <div className="support-icon">🤝</div>
            <div className="support-content">
              <h3>Still Need Help?</h3>
              <p>
                If you're having trouble finding what you need, our support team is here to help!
              </p>
              <div className="support-actions">
                <Link to="/contact" className="btn btn-outline">
                  Contact Support
                </Link>
                <Link to="/help" className="btn btn-outline">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="fun-facts-section">
          <h3>🎉 Fun Fact</h3>
          <div className="fun-fact-card">
            <p>
              Did you know? Our community has shared over <strong>10,000 skills</strong> and 
              helped <strong>5,000+ learners</strong> achieve their goals! 
              You could be next! 🌟
            </p>
            <Link to="/register" className="btn btn-primary">
              Join Our Community
            </Link>
          </div>
        </div>

        {/* Error Details (for developers) */}
        <div className="error-details">
          <details>
            <summary>Technical Details</summary>
            <div className="error-info">
              <p><strong>Error:</strong> 404 - Page Not Found</p>
              <p><strong>URL:</strong> {window.location.pathname}</p>
              <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
              <p><strong>User Agent:</strong> {navigator.userAgent}</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
