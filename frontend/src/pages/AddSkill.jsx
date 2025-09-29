import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSkill = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skillLevel: '',
    availabilityType: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const categories = [
    'Programming', 'Design', 'Languages', 'Music', 'Cooking', 
    'Fitness', 'Photography', 'Writing', 'Marketing', 'Other'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const availabilityTypes = ['Online', 'In-Person', 'Both'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo purposes, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Skill added successfully!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      setError('Failed to add skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Share Your Skill</h1>
        <p className="page-subtitle">
          Help others learn by sharing your knowledge and expertise
        </p>
      </div>

      <div className="form-container">
        <div className="form-card">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="skill-form">
            <div className="form-group">
              <label htmlFor="title">Skill Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., React.js Development, Guitar Lessons"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="skillLevel">Skill Level *</label>
              <select
                id="skillLevel"
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select your level</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="availabilityType">Availability *</label>
              <select
                id="availabilityType"
                name="availabilityType"
                value={formData.availabilityType}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select availability</option>
                {availabilityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe what you'll teach, your experience, and what students can expect to learn..."
                disabled={loading}
                rows="6"
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => navigate('/profile')}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Adding Skill...' : 'Add Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;

