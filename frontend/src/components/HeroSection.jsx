import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ isAuthenticated, totalSkills = 0 }) => {
  return (
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
          <div className="stat-number">{totalSkills}+</div>
          <div className="stat-label">Skills Available</div>
        </div>
        <div className="stat">
          <div className="stat-number">2,500+</div>
          <div className="stat-label">Expert Teachers</div>
        </div>
        <div className="stat">
          <div className="stat-number">50+</div>
          <div className="stat-label">Categories</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
