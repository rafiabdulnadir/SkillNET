import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return null; // Don't show CTA for authenticated users
  }

  return (
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
  );
};

export default CTASection;
