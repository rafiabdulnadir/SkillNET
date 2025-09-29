import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userSkills, setUserSkills] = useState([]);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    // Mock data for demonstration
    setUserSkills([
      {
        id: 1,
        title: 'React.js Development',
        category: 'Programming',
        skillLevel: 'Advanced',
        description: 'Teaching modern React development with hooks and context.',
        isActive: true,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        title: 'Guitar Lessons',
        category: 'Music',
        skillLevel: 'Intermediate',
        description: 'Acoustic guitar lessons for beginners to intermediate players.',
        isActive: true,
        createdAt: '2024-01-10'
      }
    ]);

    setUserRatings([
      {
        id: 1,
        score: 5,
        comment: 'Excellent teacher! Very patient and knowledgeable.',
        ratedBy: { name: 'John Doe' },
        createdAt: '2024-01-20'
      },
      {
        id: 2,
        score: 4,
        comment: 'Great React lessons, learned a lot!',
        ratedBy: { name: 'Jane Smith' },
        createdAt: '2024-01-18'
      }
    ]);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-details">
            <h1>{user?.name}</h1>
            <p className="profile-email">{user?.email}</p>
            {user?.location && (
              <p className="profile-location">📍 {user.location}</p>
            )}
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{userSkills.length}</span>
                <span className="stat-label">Skills</span>
              </div>
              <div className="stat">
                <span className="stat-number">{user?.averageRating?.toFixed(1) || '0.0'}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">{user?.totalRatings || 0}</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          My Skills
        </button>
        <button
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="profile-section">
              <h3>About</h3>
              <p>{user?.bio || 'No bio available yet.'}</p>
            </div>
            
            <div className="profile-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">📚</span>
                  <div className="activity-content">
                    <p>Added a new skill: React.js Development</p>
                    <span className="activity-date">2 days ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">⭐</span>
                  <div className="activity-content">
                    <p>Received a 5-star review</p>
                    <span className="activity-date">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-tab">
            <div className="skills-header">
              <h3>My Skills ({userSkills.length})</h3>
              <button className="btn-primary">Add New Skill</button>
            </div>
            
            <div className="skills-list">
              {userSkills.map(skill => (
                <div key={skill.id} className="skill-item">
                  <div className="skill-item-header">
                    <h4>{skill.title}</h4>
                    <div className="skill-item-badges">
                      <span className="category-badge">{skill.category}</span>
                      <span className="level-badge">{skill.skillLevel}</span>
                      <span className={`status-badge ${skill.isActive ? 'active' : 'inactive'}`}>
                        {skill.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <p className="skill-item-description">{skill.description}</p>
                  <div className="skill-item-footer">
                    <span className="skill-date">Added {formatDate(skill.createdAt)}</span>
                    <div className="skill-actions">
                      <button className="btn-secondary btn-sm">Edit</button>
                      <button className="btn-danger btn-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-tab">
            <div className="reviews-header">
              <h3>Reviews ({userRatings.length})</h3>
              <div className="rating-summary">
                <div className="average-rating">
                  <span className="rating-number">{user?.averageRating?.toFixed(1) || '0.0'}</span>
                  <div className="rating-stars">
                    {renderStars(Math.round(user?.averageRating || 0))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="reviews-list">
              {userRatings.map(rating => (
                <div key={rating.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <strong>{rating.ratedBy.name}</strong>
                      <div className="review-stars">
                        {renderStars(rating.score)}
                      </div>
                    </div>
                    <span className="review-date">{formatDate(rating.createdAt)}</span>
                  </div>
                  <p className="review-comment">{rating.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

