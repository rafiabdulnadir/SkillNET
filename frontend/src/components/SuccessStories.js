import React, { useState, useEffect } from 'react';

const SuccessStories = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock success stories data
  const successStories = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Marketing Manager → Full Stack Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      story: "Thanks to SkillSwap, I learned React and Node.js from amazing mentors in my community. Within 6 months, I transitioned from marketing to my dream job as a full-stack developer!",
      achievement: "Career Change Success",
      skillsLearned: ["React.js", "Node.js", "MongoDB"],
      timeframe: "6 months",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Freelance Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story: "I taught UI/UX design to 15+ students through SkillSwap while learning Python for data visualization. The platform helped me expand my skills and build a network of amazing people.",
      achievement: "Skill Exchange Master",
      skillsLearned: ["Python", "Data Visualization"],
      skillsShared: ["UI/UX Design", "Adobe Creative Suite"],
      timeframe: "1 year",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      story: "Learning digital marketing through SkillSwap increased my business revenue by 300%! The personalized mentorship and practical projects made all the difference.",
      achievement: "Business Growth",
      skillsLearned: ["Digital Marketing", "SEO", "Social Media Strategy"],
      timeframe: "4 months",
      rating: 5,
      businessImpact: "300% revenue increase"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Recent Graduate → Data Scientist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      story: "As a recent graduate, SkillSwap connected me with industry professionals who taught me real-world data science skills. I landed my first job within 3 months!",
      achievement: "First Job Success",
      skillsLearned: ["Machine Learning", "Python", "SQL"],
      timeframe: "3 months",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Photography Enthusiast → Professional",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      story: "Through SkillSwap, I learned advanced photography techniques and business skills. Now I run my own successful photography studio with clients I met through the platform!",
      achievement: "Business Launch",
      skillsLearned: ["Advanced Photography", "Business Management", "Client Relations"],
      timeframe: "8 months",
      rating: 5
    }
  ];

  // Platform statistics
  const platformStats = [
    { number: "10,000+", label: "Skills Exchanged", icon: "🔄" },
    { number: "5,000+", label: "Active Learners", icon: "👥" },
    { number: "2,500+", label: "Expert Teachers", icon: "🎓" },
    { number: "95%", label: "Success Rate", icon: "⭐" },
    { number: "50+", label: "Skill Categories", icon: "📚" },
    { number: "4.9/5", label: "Average Rating", icon: "💯" }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => 
        prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change story every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, successStories.length]);

  const nextStory = () => {
    setCurrentStoryIndex((prevIndex) => 
      prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevStory = () => {
    setCurrentStoryIndex((prevIndex) => 
      prevIndex === 0 ? successStories.length - 1 : prevIndex - 1
    );
  };

  const goToStory = (index) => {
    setCurrentStoryIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentStory = successStories[currentStoryIndex];

  return (
    <section className="success-stories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            Real people, real transformations. See how SkillSwap has helped our community members 
            achieve their learning goals and advance their careers.
          </p>
        </div>

        {/* Featured Story Carousel */}
        <div className="story-carousel">
          <div className="story-container">
            <div className="story-card featured-story">
              <div className="story-header">
                <img 
                  src={currentStory.image} 
                  alt={currentStory.name}
                  className="story-avatar"
                />
                <div className="story-info">
                  <h3 className="story-name">{currentStory.name}</h3>
                  <p className="story-role">{currentStory.role}</p>
                  <div className="story-rating">
                    {Array.from({ length: currentStory.rating }, (_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <div className="story-achievement">
                  <span className="achievement-badge">{currentStory.achievement}</span>
                </div>
              </div>
              
              <div className="story-content">
                <blockquote className="story-quote">
                  "{currentStory.story}"
                </blockquote>
                
                <div className="story-details">
                  <div className="story-skills">
                    <h4>Skills Learned:</h4>
                    <div className="skill-tags">
                      {currentStory.skillsLearned.map((skill, index) => (
                        <span key={index} className="skill-tag learned">{skill}</span>
                      ))}
                    </div>
                    {currentStory.skillsShared && (
                      <>
                        <h4>Skills Shared:</h4>
                        <div className="skill-tags">
                          {currentStory.skillsShared.map((skill, index) => (
                            <span key={index} className="skill-tag shared">{skill}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="story-metrics">
                    <div className="metric">
                      <span className="metric-icon">⏱️</span>
                      <span className="metric-value">{currentStory.timeframe}</span>
                      <span className="metric-label">Duration</span>
                    </div>
                    {currentStory.businessImpact && (
                      <div className="metric">
                        <span className="metric-icon">📈</span>
                        <span className="metric-value">{currentStory.businessImpact}</span>
                        <span className="metric-label">Impact</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="carousel-controls">
            <button 
              className="carousel-btn prev" 
              onClick={prevStory}
              aria-label="Previous story"
            >
              ←
            </button>
            
            <div className="carousel-indicators">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentStoryIndex ? 'active' : ''}`}
                  onClick={() => goToStory(index)}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="carousel-btn next" 
              onClick={nextStory}
              aria-label="Next story"
            >
              →
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="carousel-settings">
            <button 
              className={`autoplay-toggle ${isAutoPlaying ? 'active' : ''}`}
              onClick={toggleAutoPlay}
            >
              {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="platform-stats">
          <h3 className="stats-title">Platform Impact</h3>
          <div className="stats-grid">
            {platformStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="success-cta">
          <h3>Ready to Write Your Success Story?</h3>
          <p>Join thousands of learners and teachers who are transforming their lives through skill exchange.</p>
          <div className="cta-buttons">
            <a href="/register" className="btn btn-primary">Start Learning</a>
            <a href="/add-skill" className="btn btn-outline">Share Your Skills</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
