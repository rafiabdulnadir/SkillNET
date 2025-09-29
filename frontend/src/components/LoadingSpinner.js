import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = '', 
  fullScreen = false,
  overlay = false 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'spinner-small';
      case 'large':
        return 'spinner-large';
      case 'xlarge':
        return 'spinner-xlarge';
      default:
        return 'spinner-medium';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'white':
        return 'spinner-white';
      case 'secondary':
        return 'spinner-secondary';
      case 'success':
        return 'spinner-success';
      case 'warning':
        return 'spinner-warning';
      case 'danger':
        return 'spinner-danger';
      default:
        return 'spinner-primary';
    }
  };

  const spinnerElement = (
    <div className={`loading-spinner ${getSizeClass()} ${getColorClass()}`}>
      <div className="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && <div className="spinner-text">{text}</div>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <div className="loading-logo">🔄</div>
          <h2>SkillSwap</h2>
          {spinnerElement}
          <p>Loading your skills community...</p>
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="loading-overlay">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

// Skeleton Loading Components
export const SkillCardSkeleton = () => (
  <div className="skill-card skeleton">
    <div className="skill-card-header">
      <div className="skeleton-text skeleton-category"></div>
      <div className="skeleton-text skeleton-availability"></div>
    </div>
    <div className="skill-card-content">
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-text skeleton-description"></div>
      <div className="skeleton-text skeleton-description short"></div>
      <div className="skeleton-badge"></div>
    </div>
    <div className="skill-card-footer">
      <div className="user-info">
        <div className="skeleton-avatar"></div>
        <div className="user-details">
          <div className="skeleton-text skeleton-name"></div>
          <div className="skeleton-text skeleton-location"></div>
          <div className="skeleton-text skeleton-rating"></div>
        </div>
      </div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export const MessageSkeleton = () => (
  <div className="message-skeleton">
    <div className="skeleton-avatar"></div>
    <div className="message-content">
      <div className="skeleton-text skeleton-message-header"></div>
      <div className="skeleton-text skeleton-message-text"></div>
      <div className="skeleton-text skeleton-message-text short"></div>
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="profile-skeleton">
    <div className="profile-header-skeleton">
      <div className="skeleton-avatar large"></div>
      <div className="profile-info">
        <div className="skeleton-text skeleton-name large"></div>
        <div className="skeleton-text skeleton-location"></div>
        <div className="skeleton-text skeleton-bio"></div>
        <div className="skeleton-text skeleton-bio short"></div>
      </div>
    </div>
    <div className="profile-stats-skeleton">
      <div className="skeleton-stat"></div>
      <div className="skeleton-stat"></div>
      <div className="skeleton-stat"></div>
    </div>
  </div>
);

// Inline Loading States
export const InlineLoader = ({ text = 'Loading...' }) => (
  <div className="inline-loader">
    <div className="inline-spinner"></div>
    <span>{text}</span>
  </div>
);

// Button Loading State
export const ButtonLoader = ({ size = 'small' }) => (
  <div className={`button-loader ${size}`}>
    <div className="button-spinner"></div>
  </div>
);

// Dots Loading Animation
export const DotsLoader = ({ color = 'primary' }) => (
  <div className={`dots-loader ${color}`}>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
);

// Pulse Loading Animation
export const PulseLoader = ({ count = 3, color = 'primary' }) => (
  <div className={`pulse-loader ${color}`}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="pulse-dot" style={{ animationDelay: `${i * 0.2}s` }}></div>
    ))}
  </div>
);

// Progress Bar
export const ProgressBar = ({ progress = 0, showPercentage = true, color = 'primary' }) => (
  <div className={`progress-bar ${color}`}>
    <div className="progress-track">
      <div 
        className="progress-fill" 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      ></div>
    </div>
    {showPercentage && (
      <span className="progress-text">{Math.round(progress)}%</span>
    )}
  </div>
);

export default LoadingSpinner;

