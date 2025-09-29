import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination, { usePagination } from '../components/Pagination';

// Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah Chen',
      message: 'Hi! I\'m interested in learning React from you. When would be a good time to connect?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/messages/sarah-chen',
      metadata: { sender: 'Sarah Chen', skill: 'React Development' }
    },
    {
      id: 2,
      type: 'skill_request',
      title: 'New skill exchange request',
      message: 'Marcus Johnson wants to exchange UI/UX Design for Python Programming',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/requests/marcus-johnson',
      metadata: { requester: 'Marcus Johnson', skillOffered: 'UI/UX Design', skillWanted: 'Python Programming' }
    },
    {
      id: 3,
      type: 'rating',
      title: 'New rating received',
      message: 'Emily Rodriguez rated your Python Programming session 5 stars!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/ratings',
      metadata: { rater: 'Emily Rodriguez', rating: 5, skill: 'Python Programming' }
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile completion reminder',
      message: 'Complete your profile to get 50% more skill requests. Add your portfolio and certifications.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      avatar: null,
      actionUrl: '/profile',
      metadata: { completionPercentage: 65 }
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Achievement unlocked!',
      message: 'Congratulations! You\'ve earned the "Helpful Teacher" badge for completing 10 skill sessions.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      avatar: null,
      actionUrl: '/profile/achievements',
      metadata: { achievement: 'Helpful Teacher', sessionsCompleted: 10 }
    },
    {
      id: 6,
      type: 'session_reminder',
      title: 'Upcoming session reminder',
      message: 'You have a React Development session with Sarah Chen in 1 hour.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      actionUrl: '/sessions/upcoming',
      metadata: { sessionTime: new Date(Date.now() + 60 * 60 * 1000), student: 'Sarah Chen', skill: 'React Development' }
    }
  ];

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [markingAsRead, setMarkingAsRead] = useState(new Set());

  // Pagination
  const {
    currentPage,
    totalPages,
    goToPage,
    pageSize
  } = usePagination({
    totalItems: notifications.length,
    itemsPerPage: 20,
    initialPage: 1
  });

  // Load notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setNotifications(mockNotifications);
      } catch (err) {
        setError('Failed to load notifications');
        console.error('Notifications error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  // Paginate notifications
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + pageSize);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    if (markingAsRead.has(notificationId)) return;
    
    setMarkingAsRead(prev => new Set(prev).add(notificationId));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    } finally {
      setMarkingAsRead(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (err) {
      setError('Failed to mark all notifications as read');
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev => 
        prev.filter(notification => notification.id !== notificationId)
      );
    } catch (err) {
      console.error('Error deleting notification:', err);
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
  };

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
      case 'session_reminder':
        return '📅';
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

  // Get filter counts
  const getFilterCounts = () => {
    return {
      all: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      message: notifications.filter(n => n.type === 'message').length,
      skill_request: notifications.filter(n => n.type === 'skill_request').length,
      rating: notifications.filter(n => n.type === 'rating').length,
      system: notifications.filter(n => n.type === 'system').length,
      achievement: notifications.filter(n => n.type === 'achievement').length,
    };
  };

  const filterCounts = getFilterCounts();

  if (loading && notifications.length === 0) {
    return (
      <div className="notifications-loading">
        <div className="container">
          <LoadingSpinner size="large" />
          <p>Loading your notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="container">
        {/* Header */}
        <div className="notifications-header">
          <div className="header-content">
            <h1 className="notifications-title">Notifications</h1>
            <p className="notifications-subtitle">
              Stay updated with your skill sharing activities
            </p>
          </div>
          
          {filterCounts.unread > 0 && (
            <div className="header-actions">
              <button
                onClick={markAllAsRead}
                disabled={loading}
                className="btn btn-outline"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Mark All Read'}
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="notifications-filters">
          <div className="filter-tabs">
            <button
              onClick={() => setFilter('all')}
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            >
              All ({filterCounts.all})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
            >
              Unread ({filterCounts.unread})
            </button>
            <button
              onClick={() => setFilter('message')}
              className={`filter-tab ${filter === 'message' ? 'active' : ''}`}
            >
              💬 Messages ({filterCounts.message})
            </button>
            <button
              onClick={() => setFilter('skill_request')}
              className={`filter-tab ${filter === 'skill_request' ? 'active' : ''}`}
            >
              🤝 Requests ({filterCounts.skill_request})
            </button>
            <button
              onClick={() => setFilter('rating')}
              className={`filter-tab ${filter === 'rating' ? 'active' : ''}`}
            >
              ⭐ Ratings ({filterCounts.rating})
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="notifications-error">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Notifications</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        )}

        {/* Notifications List */}
        {!error && (
          <div className="notifications-content">
            {filteredNotifications.length === 0 ? (
              <div className="no-notifications">
                <div className="no-notifications-icon">🔔</div>
                <h3>No notifications found</h3>
                <p>
                  {filter === 'all' 
                    ? "You don't have any notifications yet. Start engaging with the community to receive updates!"
                    : `No ${filter === 'unread' ? 'unread' : filter.replace('_', ' ')} notifications found.`
                  }
                </p>
                {filter !== 'all' && (
                  <button
                    onClick={() => setFilter('all')}
                    className="btn btn-outline"
                  >
                    View All Notifications
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="notifications-list">
                  {paginatedNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
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
                      
                      <div 
                        className="notification-content"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="notification-header">
                          <div className="notification-title">
                            {notification.title}
                          </div>
                          <div className="notification-timestamp">
                            {formatTimestamp(notification.timestamp)}
                          </div>
                        </div>
                        
                        <div className="notification-message">
                          {notification.message}
                        </div>
                        
                        {notification.metadata && (
                          <div className="notification-metadata">
                            {notification.type === 'rating' && (
                              <div className="rating-stars">
                                {'⭐'.repeat(notification.metadata.rating)}
                              </div>
                            )}
                            {notification.type === 'achievement' && (
                              <div className="achievement-badge">
                                🏆 {notification.metadata.achievement}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="notification-actions">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            disabled={markingAsRead.has(notification.id)}
                            className="btn btn-small btn-outline"
                            title="Mark as read"
                          >
                            {markingAsRead.has(notification.id) ? (
                              <LoadingSpinner size="small" />
                            ) : (
                              '✓'
                            )}
                          </button>
                        )}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="btn btn-small btn-outline danger"
                          title="Delete notification"
                        >
                          🗑️
                        </button>
                      </div>
                      
                      {!notification.read && (
                        <div className="unread-indicator"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="notifications-pagination">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={filteredNotifications.length}
                      itemsPerPage={pageSize}
                      onPageChange={goToPage}
                      showInfo={true}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Notification Settings Link */}
        <div className="notifications-footer">
          <p>Want to customize your notifications?</p>
          <a href="/settings" className="btn btn-outline">
            Notification Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
