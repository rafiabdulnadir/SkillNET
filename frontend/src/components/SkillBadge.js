import React from 'react';

const SkillBadge = ({ 
  skill, 
  variant = 'default', 
  size = 'medium', 
  removable = false, 
  onRemove = null,
  onClick = null,
  className = ''
}) => {
  const variantClasses = {
    default: 'skill-badge-default',
    primary: 'skill-badge-primary',
    secondary: 'skill-badge-secondary',
    success: 'skill-badge-success',
    warning: 'skill-badge-warning',
    danger: 'skill-badge-danger',
    outline: 'skill-badge-outline'
  };

  const sizeClasses = {
    small: 'skill-badge-small',
    medium: 'skill-badge-medium',
    large: 'skill-badge-large'
  };

  const handleClick = () => {
    if (onClick) {
      onClick(skill);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(skill);
    }
  };

  return (
    <span 
      className={`skill-badge ${variantClasses[variant]} ${sizeClasses[size]} ${onClick ? 'clickable' : ''} ${className}`}
      onClick={handleClick}
      title={typeof skill === 'object' ? skill.description : skill}
    >
      <span className="skill-badge-text">
        {typeof skill === 'object' ? skill.name : skill}
      </span>
      
      {typeof skill === 'object' && skill.level && (
        <span className="skill-level">
          {'★'.repeat(skill.level)}
        </span>
      )}
      
      {removable && (
        <button 
          className="skill-badge-remove"
          onClick={handleRemove}
          aria-label={`Remove ${typeof skill === 'object' ? skill.name : skill}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

export default SkillBadge;
