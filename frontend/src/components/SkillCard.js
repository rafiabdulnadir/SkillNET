import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { cardHover, buttonHover, iconHover } from '../utils/animations';

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark } = useTheme();

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
    <motion.div 
      className="skill-card"
      {...cardHover}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Header with Category and Availability */}
      <div className="skill-card-header">
        <motion.div 
          className="skill-category"
          {...iconHover}
        >
          <span className="category-icon">📚</span>
          {skill.category}
        </motion.div>
        <motion.div 
          className="skill-availability"
          {...iconHover}
        >
          <span className="availability-icon">{getAvailabilityIcon(skill.availabilityType)}</span>
          <span className="availability-text">{skill.availabilityType}</span>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="skill-card-content">
        <motion.h3 
          className="skill-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {skill.title}
        </motion.h3>
        
        <motion.p 
          className="skill-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {skill.description}
        </motion.p>
        
        <motion.div 
          className="skill-level-badge"
          {...iconHover}
        >
          <span 
            className={`skill-level skill-level-${skill.skillLevel.toLowerCase()}`}
            style={{ backgroundColor: getSkillLevelColor(skill.skillLevel) }}
          >
            <span className="level-icon">
              {skill.skillLevel.toLowerCase() === 'beginner' && '🌱'}
              {skill.skillLevel.toLowerCase() === 'intermediate' && '🌿'}
              {skill.skillLevel.toLowerCase() === 'advanced' && '🌳'}
            </span>
            {skill.skillLevel}
          </span>
        </motion.div>
      </div>

      {/* Footer with User Info and Actions */}
      <div className="skill-card-footer">
        <motion.div 
          className="user-info" 
          onClick={handleViewProfile}
          {...buttonHover}
          whileTap={{ scale: 0.98 }}
        >
          <div className="user-avatar">
            {skill.user.profileImageUrl ? (
              <motion.img 
                src={skill.user.profileImageUrl} 
                alt={skill.user.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.user.name)}&background=3b82f6&color=ffffff&size=48`;
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.div 
                className="avatar-placeholder"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {skill.user.name.charAt(0).toUpperCase()}
              </motion.div>
            )}
            <div className="user-status-indicator"></div>
          </div>
          
          <div className="user-details">
            <div className="user-name">{skill.user.name}</div>
            <div className="user-location">
              <span className="location-icon">📍</span>
              {skill.user.location}
            </div>
            <div className="user-rating">
              <div className="stars">
                {renderStars(skill.user.averageRating || 0)}
              </div>
              <span className="rating-text">
                {skill.user.averageRating ? skill.user.averageRating.toFixed(1) : '0.0'} 
                <span className="rating-count">({skill.user.totalRatings || 0})</span>
              </span>
            </div>
          </div>
        </motion.div>

        <div className="skill-card-actions">
          <motion.div 
            className="skill-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="skill-date">
              <span className="date-icon">📅</span>
              {formatDate(skill.createdAt)}
            </div>
            {skill.tags && skill.tags.length > 0 && (
              <div className="skill-tags">
                {skill.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="skill-tag">
                    #{tag}
                  </span>
                ))}
                {skill.tags.length > 2 && (
                  <span className="skill-tag-more">+{skill.tags.length - 2}</span>
                )}
              </div>
            )}
          </motion.div>
          
          <motion.button 
            className={`contact-btn ${user && user.id === skill.user.id ? 'own-skill' : ''}`}
            onClick={handleContactUser}
            disabled={user && user.id === skill.user.id}
            {...buttonHover}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">
              {user && user.id === skill.user.id ? '👤' : '💬'}
            </span>
            {user && user.id === skill.user.id ? 'Your Skill' : 'Contact'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
