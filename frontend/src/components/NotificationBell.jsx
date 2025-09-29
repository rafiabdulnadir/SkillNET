import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const NotificationBell = ({
  className = '',
  size = 'medium',
  showBadge = true,
  maxNotifications = 10,
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  // Mock notifications data - replace with actual API calls
  const mockNotifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah Chen',
      message: 'Hi! I\'m interested in learning React from you. When would be a good time to connect?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/messages/sarah-chen'
    },
    {
      id: 2,
      type: 'skill_request',
      title: 'New skill exchange request',
      message: 'Marcus Johnson wants to exchange UI/UX Design for Python Programming',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/requests/marcus-johnson'
    },
    {
      id: 3,
      type: 'rating',
      title: 'New rating received',
      message: 'Emily Rodriguez rated your Python Programming session 5 stars!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/ratings'
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile completion reminder',
      message: 'Complete your profile to get 50% more skill requests. Add your portfolio and certifications.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: true,
      avatar: null,
      actionUrl: '/profile'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Achievement unlocked!',
      message: 'Congratulations! You\'ve earned the "Helpful Teacher" badge for completing 10 skill sessions.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      avatar: null,
      actionUrl: '/profile/achievements'
    }
  ];

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use mock data for now
      const sortedNotifications = mockNotifications
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, maxNotifications);
      
      setNotifications(sortedNotifications);
      setUnreadCount(sortedNotifications.filter(n => !n.read).length);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    
    setIsOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchNotifications();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !bellRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-refresh notifications
  useEffect(() => {
    if (!autoRefresh || !user) return;

    fetchNotifications(); // Initial fetch
    
    const interval = setInterval(fetchNotifications, refreshInterval);
    return () => clearInterval(interval);
  }, [user, autoRefresh, refreshInterval]);

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return '💬';
      case 'skill_request':
        return '🤝';
      case 'rating':
        return '⭐';
      case 'system':
        return '🔔';
      case 'achievement':
        return '🏆';
      default:
        return '📢';
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Size classes
  const sizeClasses = {
    small: 'notification-bell-small',
    medium: 'notification-bell-medium',
    large: 'notification-bell-large',
  };

  if (!user) return null;

  return (
    <div className={`notification-bell ${sizeClasses[size]} ${className}`}>
      {/* Bell Button */}
      <button
        ref={bellRef}
        onClick={toggleDropdown}
        className={`notification-button ${isOpen ? 'active' : ''}`}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        type="button"
      >
        <span className="bell-icon">🔔</span>
        
        {showBadge && unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div ref={dropdownRef} className="notification-dropdown">
          {/* Header */}
          <div className="notification-header">
            <h3 className="notification-title">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="mark-all-read-button"
                disabled={loading}
                type="button"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && notifications.length === 0 && (
            <div className="notification-loading">
              <div className="loading-spinner"></div>
              <p>Loading notifications...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="notification-error">
              <p>{error}</p>
              <button
                onClick={fetchNotifications}
                className="btn btn-outline btn-small"
                type="button"
              >
                Retry
              </button>
            </div>
          )}

          {/* Notifications List */}
          {!loading && !error && (
            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">
                  <div className="no-notifications-icon">🔔</div>
                  <p>No notifications yet</p>
                  <span>We'll notify you when something happens!</span>
                </div>
              ) : (
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    type="button"
                  >
                    <div className="notification-avatar">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="avatar-image"
                        />
                      ) : (
                        <div className="avatar-icon">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="notification-content">
                      <div className="notification-item-title">
                        {notification.title}
                      </div>
                      <div className="notification-message">
                        {notification.message}
                      </div>
                      <div className="notification-timestamp">
                        {formatTimestamp(notification.timestamp)}
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="unread-indicator"></div>
                    )}
                  </button>
                ))
              )}
            </div>
          )}

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="notification-footer">
              <a href="/notifications" className="view-all-link">
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
