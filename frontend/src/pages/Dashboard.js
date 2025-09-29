import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock dashboard data
  const mockDashboardData = {
    stats: {
      skillsShared: 8,
      skillsLearned: 12,
      totalSessions: 45,
      averageRating: 4.8,
      hoursTeaching: 67,
      hoursLearning: 89,
      achievements: 6,
      connections: 23
    },
    recentActivity: [
      {
        id: 1,
        type: 'session_completed',
        title: 'Completed React session with Sarah Chen',
        description: 'Taught React components and state management',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: '✅',
        color: 'success'
      },
      {
        id: 2,
        type: 'rating_received',
        title: 'Received 5-star rating',
        description: 'Emily Rodriguez rated your Digital Marketing session',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        icon: '⭐',
        color: 'warning'
      },
      {
        id: 3,
        type: 'new_connection',
        title: 'New connection request',
        description: 'Marcus Johnson wants to connect for UI/UX Design',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        icon: '🤝',
        color: 'info'
      },
      {
        id: 4,
        type: 'skill_added',
        title: 'Added new skill',
        description: 'You added Python Programming to your skills',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        icon: '🎯',
        color: 'primary'
      }
    ],
    upcomingSessions: [
      {
        id: 1,
        title: 'React Advanced Patterns',
        student: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        date: new Date(Date.now() + 2 * 60 * 60 * 1000),
        duration: 60,
        type: 'teaching'
      },
      {
        id: 2,
        title: 'UI/UX Design Fundamentals',
        teacher: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        duration: 90,
        type: 'learning'
      }
    ],
    skillProgress: [
      {
        skill: 'React Development',
        level: 'Expert',
        progress: 95,
        sessionsCompleted: 15,
        totalSessions: 16
      },
      {
        skill: 'Python Programming',
        level: 'Intermediate',
        progress: 70,
        sessionsCompleted: 7,
        totalSessions: 10
      },
      {
        skill: 'Digital Marketing',
        level: 'Advanced',
        progress: 85,
        sessionsCompleted: 12,
        totalSessions: 14
      }
    ],
    recommendations: [
      {
        id: 1,
        type: 'skill',
        title: 'Learn Node.js',
        description: 'Complete your full-stack development skills',
        icon: '🚀',
        action: 'Browse Skills'
      },
      {
        id: 2,
        type: 'connection',
        title: 'Connect with Data Scientists',
        description: 'Expand your network in analytics',
        icon: '📊',
        action: 'Find People'
      },
      {
        id: 3,
        type: 'achievement',
        title: 'Complete Profile',
        description: 'Add portfolio links to get more requests',
        icon: '👤',
        action: 'Edit Profile'
      }
    ]
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDashboardData(mockDashboardData);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Format upcoming session time
  const formatSessionTime = (date) => {
    return new Date(date).toLocaleString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <LoadingSpinner size="large" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Unable to load dashboard</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1 className="dashboard-title">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="dashboard-subtitle">
              Here's what's happening with your skill sharing journey
            </p>
          </div>
          
          <div className="quick-actions">
            <Link to="/add-skill" className="btn btn-primary">
              Share New Skill
            </Link>
            <Link to="/explore" className="btn btn-outline">
              Find Skills
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-number">{dashboardData.stats.skillsShared}</div>
                <div className="stat-label">Skills Shared</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <div className="stat-number">{dashboardData.stats.skillsLearned}</div>
                <div className="stat-label">Skills Learning</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">{dashboardData.stats.totalSessions}</div>
                <div className="stat-label">Total Sessions</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-number">{dashboardData.stats.averageRating}</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-content">
          {/* Left Column */}
          <div className="dashboard-left">
            {/* Recent Activity */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Recent Activity</h2>
                <Link to="/activity" className="section-link">View All</Link>
              </div>
              
              <div className="activity-list">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className={`activity-item ${activity.color}`}>
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-title">{activity.title}</div>
                      <div className="activity-description">{activity.description}</div>
                      <div className="activity-time">{formatTimestamp(activity.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Progress */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Skill Progress</h2>
                <Link to="/skills" className="section-link">Manage Skills</Link>
              </div>
              
              <div className="skill-progress-list">
                {dashboardData.skillProgress.map((skill, index) => (
                  <div key={index} className="skill-progress-item">
                    <div className="skill-info">
                      <div className="skill-name">{skill.skill}</div>
                      <div className="skill-level">{skill.level}</div>
                    </div>
                    <div className="skill-stats">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <div className="skill-sessions">
                        {skill.sessionsCompleted}/{skill.totalSessions} sessions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right">
            {/* Upcoming Sessions */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Upcoming Sessions</h2>
                <Link to="/sessions" className="section-link">View Calendar</Link>
              </div>
              
              {dashboardData.upcomingSessions.length === 0 ? (
                <div className="no-sessions">
                  <div className="no-sessions-icon">📅</div>
                  <p>No upcoming sessions</p>
                  <Link to="/explore" className="btn btn-outline btn-small">
                    Schedule a Session
                  </Link>
                </div>
              ) : (
                <div className="sessions-list">
                  {dashboardData.upcomingSessions.map((session) => (
                    <div key={session.id} className={`session-item ${session.type}`}>
                      <div className="session-avatar">
                        <img 
                          src={session.avatar} 
                          alt={session.student || session.teacher}
                          className="avatar-image"
                        />
                      </div>
                      <div className="session-content">
                        <div className="session-title">{session.title}</div>
                        <div className="session-partner">
                          {session.type === 'teaching' ? 'Teaching' : 'Learning from'} {session.student || session.teacher}
                        </div>
                        <div className="session-time">
                          {formatSessionTime(session.date)} • {session.duration}min
                        </div>
                      </div>
                      <div className="session-actions">
                        <button className="btn btn-small btn-outline">
                          {session.type === 'teaching' ? 'Prepare' : 'Join'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Recommendations</h2>
              </div>
              
              <div className="recommendations-list">
                {dashboardData.recommendations.map((rec) => (
                  <div key={rec.id} className="recommendation-item">
                    <div className="recommendation-icon">{rec.icon}</div>
                    <div className="recommendation-content">
                      <div className="recommendation-title">{rec.title}</div>
                      <div className="recommendation-description">{rec.description}</div>
                    </div>
                    <button className="btn btn-small btn-outline">
                      {rec.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">Your Impact</h2>
              </div>
              
              <div className="impact-stats">
                <div className="impact-item">
                  <div className="impact-number">{dashboardData.stats.hoursTeaching}</div>
                  <div className="impact-label">Hours Teaching</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">{dashboardData.stats.hoursLearning}</div>
                  <div className="impact-label">Hours Learning</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">{dashboardData.stats.connections}</div>
                  <div className="impact-label">Connections Made</div>
                </div>
                <div className="impact-item">
                  <div className="impact-number">{dashboardData.stats.achievements}</div>
                  <div className="impact-label">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
