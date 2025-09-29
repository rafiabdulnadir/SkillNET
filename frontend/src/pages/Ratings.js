import React, { useState } from 'react';

const Ratings = () => {
  const [ratings] = useState([
    {
      id: 1,
      score: 5,
      comment: 'Excellent React teacher! Very patient and explains concepts clearly.',
      ratedBy: { name: 'John Doe', avatar: null },
      skill: { title: 'React.js Development' },
      createdAt: '2024-01-20T14:30:00Z'
    },
    {
      id: 2,
      score: 4,
      comment: 'Great guitar lessons, learned a lot in just a few sessions.',
      ratedBy: { name: 'Jane Smith', avatar: null },
      skill: { title: 'Guitar Lessons' },
      createdAt: '2024-01-18T16:45:00Z'
    },
    {
      id: 3,
      score: 5,
      comment: 'Amazing cooking class! Now I can make authentic Italian pasta.',
      ratedBy: { name: 'Mike Johnson', avatar: null },
      skill: { title: 'Italian Cooking' },
      createdAt: '2024-01-15T12:20:00Z'
    }
  ]);

  const averageRating = ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length;

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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach(rating => {
      distribution[rating.score]++;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Reviews & Ratings</h1>
        <p className="page-subtitle">
          See what students are saying about your teaching
        </p>
      </div>

      <div className="ratings-overview">
        <div className="rating-summary-card">
          <div className="overall-rating">
            <div className="rating-number">{averageRating.toFixed(1)}</div>
            <div className="rating-stars-large">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="rating-count">{ratings.length} reviews</div>
          </div>

          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="distribution-row">
                <span className="star-label">{star} ★</span>
                <div className="distribution-bar">
                  <div 
                    className="distribution-fill"
                    style={{ 
                      width: `${ratings.length > 0 ? (distribution[star] / ratings.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="distribution-count">{distribution[star]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ratings-list">
        <h2>All Reviews</h2>
        
        {ratings.length === 0 ? (
          <div className="no-ratings">
            <h3>No reviews yet</h3>
            <p>Start teaching to receive your first reviews!</p>
          </div>
        ) : (
          <div className="reviews-grid">
            {ratings.map(rating => (
              <div key={rating.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {rating.ratedBy.avatar ? (
                        <img src={rating.ratedBy.avatar} alt={rating.ratedBy.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {rating.ratedBy.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="reviewer-details">
                      <h4>{rating.ratedBy.name}</h4>
                      <p className="skill-title">for {rating.skill.title}</p>
                    </div>
                  </div>
                  
                  <div className="review-meta">
                    <div className="review-stars">
                      {renderStars(rating.score)}
                    </div>
                    <span className="review-date">{formatDate(rating.createdAt)}</span>
                  </div>
                </div>

                <div className="review-content">
                  <p>{rating.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ratings;

