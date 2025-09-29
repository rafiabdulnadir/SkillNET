import React from "react";
import { Link } from "react-router-dom";
import "./component.css"; // ensure styles are included

const HeroSection = ({ isAuthenticated, totalSkills = 0 }) => {
  return (
    <section className="hero-container">
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* Headline */}
        <h1 className="hero-title">
          Share Skills, <span className="highlight">Build Community</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Connect with neighbors to teach, learn, and exchange skills. From
          tutoring to gardening, cooking to coding – discover endless
          possibilities in your community.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          {!isAuthenticated ? (
            <>
              <Link to="/explore" className="btn btn-primary btn-large">
                🔍 Explore Skills
              </Link>
              <Link to="/register" className="btn btn-outline btn-large">
                ✨ Share Your Skills
              </Link>
            </>
          ) : (
            <Link to="/add-skill" className="btn btn-primary btn-large">
              🚀 Share a Skill
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-icon">👥</span>
            <div>
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Community Members</div>
            </div>
          </div>

          <div className="stat">
            <span className="stat-icon">⭐</span>
            <div>
              <div className="stat-number">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>

          <div className="stat">
            <span className="stat-icon">📍</span>
            <div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
