import React from 'react';

const UserAvatar = ({ 
  user, 
  size = 'medium', 
  showOnlineStatus = false, 
  showRating = false,
  className = '',
  onClick = null
}) => {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large',
    xlarge: 'avatar-xlarge'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    if (!name) return '#6b7280';
    
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308',
      '#84cc16', '#22c55e', '#10b981', '#14b8a6',
      '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  return (
    <div 
      className={`user-avatar ${sizeClasses[size]} ${onClick ? 'clickable' : ''} ${className}`}
      onClick={handleClick}
      title={user?.name || 'User'}
    >
      <div className="avatar-container">
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name || 'User'} 
            className="avatar-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        <div 
          className="avatar-fallback"
          style={{ 
            backgroundColor: getAvatarColor(user?.name),
            display: user?.avatar ? 'none' : 'flex'
          }}
        >
          {getInitials(user?.name)}
        </div>
        
        {showOnlineStatus && (
          <div className={`online-status ${user?.isOnline ? 'online' : 'offline'}`} />
        )}
      </div>
      
      {showRating && user?.rating && (
        <div className="avatar-rating">
          <span className="rating-stars">
            {'★'.repeat(Math.floor(user.rating))}
          </span>
          <span className="rating-value">{user.rating}</span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
