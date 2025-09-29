import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContactUser = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/messages/${skill.user.id}`);
  };

  const handleViewProfile = () => {
    navigate(`/profile/${skill.user.id}`);
  };

  const getSkillLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return '#10b981'; // green
      case 'intermediate':
        return '#f59e0b'; // yellow
      case 'advanced':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  const getAvailabilityIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'online':
        return '💻';
      case 'in-person':
        return '🏢';
      case 'both':
        return '🌐';
      default:
        return '📍';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div className="skill-category">{skill.category}</div>
        <div className="skill-availability">
          <span className="availability-icon">{getAvailabilityIcon(skill.availabilityType)}</span>
          <span className="availability-text">{skill.availabilityType}</span>
        </div>
      </div>

      <div className="skill-card-content">
        <h3 className="skill-title">{skill.title}</h3>
        <p className="skill-description">{skill.description}</p>
        
        <div className="skill-level-badge">
          <span 
            className="skill-level"
            style={{ backgroundColor: getSkillLevelColor(skill.skillLevel) }}
          >
            {skill.skillLevel}
          </span>
        </div>
      </div>

      <div className="skill-card-footer">
        <div className="user-info" onClick={handleViewProfile}>
          <div className="user-avatar">
            {skill.user.profileImageUrl ? (
              <img 
                src={skill.user.profileImageUrl} 
                alt={skill.user.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.user.name)}&background=1e3a8a&color=ffffff&size=40`;
                }}
              />
            ) : (
              <div className="avatar-placeholder">
                {skill.user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-details">
            <div className="user-name">{skill.user.name}</div>
            <div className="user-location">{skill.user.location}</div>
            <div className="user-rating">
              <div className="stars">
                {renderStars(skill.user.averageRating || 0)}
              </div>
              <span className="rating-text">
                {skill.user.averageRating ? skill.user.averageRating.toFixed(1) : '0.0'} 
                ({skill.user.totalRatings || 0})
              </span>
            </div>
          </div>
        </div>

        <div className="skill-card-actions">
          <div className="skill-date">
            Posted {formatDate(skill.createdAt)}
          </div>
          <button 
            className="contact-btn"
            onClick={handleContactUser}
            disabled={user && user.id === skill.user.id}
          >
            {user && user.id === skill.user.id ? 'Your Skill' : 'Contact'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;

