import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Footer = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmitFeedback = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call - replace with actual API endpoint
      console.log('Feedback submitted:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFeedbackSubmitted(true);
      reset();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setFeedbackSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>🔄 SkillSwap</h3>
              <p className="footer-tagline">Connect • Learn • Share Skills</p>
            </div>
            <p className="footer-description">
              SkillSwap is a community-driven platform where people connect to exchange 
              knowledge and skills. Whether you're looking to learn something new or 
              share your expertise, we make skill exchange easy and rewarding.
            </p>
            <div className="footer-social">
              <button className="social-link" aria-label="Facebook" onClick={() => window.open('https://facebook.com', '_blank')}>
                <span>📘</span>
              </button>
              <button className="social-link" aria-label="Twitter" onClick={() => window.open('https://twitter.com', '_blank')}>
                <span>🐦</span>
              </button>
              <button className="social-link" aria-label="LinkedIn" onClick={() => window.open('https://linkedin.com', '_blank')}>
                <span>💼</span>
              </button>
              <button className="social-link" aria-label="Instagram" onClick={() => window.open('https://instagram.com', '_blank')}>
                <span>📷</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/skills">Browse Skills</a></li>
              <li><a href="/add-skill">Share a Skill</a></li>
              <li><a href="/profile">My Profile</a></li>
              <li><a href="/messages">Messages</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-title">Popular Categories</h4>
            <ul className="footer-links">
              <li><a href="/skills?category=Web Development">Web Development</a></li>
              <li><a href="/skills?category=Design">Design</a></li>
              <li><a href="/skills?category=Data Science">Data Science</a></li>
              <li><a href="/skills?category=Marketing">Marketing</a></li>
              <li><a href="/skills?category=Photography">Photography</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/safety">Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div className="footer-section feedback-section">
            <h4 className="footer-title">Send us Feedback</h4>
            <p className="feedback-description">
              Help us improve SkillSwap! Share your thoughts, suggestions, or report issues.
            </p>
            
            {feedbackSubmitted ? (
              <div className="feedback-success">
                <div className="success-icon">✅</div>
                <p>Thank you for your feedback!</p>
                <p>We appreciate your input and will review it soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmitFeedback)} className="feedback-form">
                <div className="form-group">
                  <select
                    {...register('type', { required: 'Please select feedback type' })}
                    className={`form-input ${errors.type ? 'error' : ''}`}
                  >
                    <option value="">Select feedback type</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="general">General Feedback</option>
                    <option value="compliment">Compliment</option>
                  </select>
                  {errors.type && (
                    <span className="error-message">{errors.type.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    {...register('message', { 
                      required: 'Please enter your feedback',
                      minLength: { value: 10, message: 'Feedback must be at least 10 characters' }
                    })}
                    placeholder="Tell us what's on your mind..."
                    rows="4"
                    className={`form-input ${errors.message ? 'error' : ''}`}
                  />
                  {errors.message && (
                    <span className="error-message">{errors.message.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    {...register('email', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    type="email"
                    placeholder="Your email (optional)"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary feedback-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Feedback'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} SkillSwap. All rights reserved.</p>
              <p>Made with ❤️ for the learning community</p>
            </div>
            <div className="footer-contact">
              <p>📧 support@skillswap.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 San Francisco, CA</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
