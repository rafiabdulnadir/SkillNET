import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Passionate about connecting people through skill sharing',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      skills: ['Leadership', 'Product Strategy', 'Community Building']
    },
    {
      name: 'Marcus Chen',
      role: 'CTO',
      bio: 'Building the technology that powers skill exchange',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      skills: ['Full Stack Development', 'System Architecture', 'AI/ML']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      bio: 'Creating beautiful and intuitive user experiences',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      skills: ['UI/UX Design', 'User Research', 'Design Systems']
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Skills Shared', icon: '🎯' },
    { number: '5,000+', label: 'Active Learners', icon: '👥' },
    { number: '50,000+', label: 'Sessions Completed', icon: '✅' },
    { number: '95%', label: 'Success Rate', icon: '⭐' }
  ];

  const values = [
    {
      title: 'Community First',
      description: 'We believe in the power of community and peer-to-peer learning',
      icon: '🤝'
    },
    {
      title: 'Accessibility',
      description: 'Making skill sharing accessible to everyone, regardless of background',
      icon: '🌍'
    },
    {
      title: 'Quality',
      description: 'Ensuring high-quality learning experiences through our rating system',
      icon: '⭐'
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology',
      icon: '🚀'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About SkillSwap</h1>
            <p className="hero-subtitle">
              Connecting people through the power of skill sharing and collaborative learning
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Mission Section */}
        <div className="about-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p className="mission-text">
              At SkillSwap, we believe that everyone has something valuable to teach and something new to learn. 
              Our mission is to create a global community where people can connect, share their expertise, 
              and grow together through collaborative learning experiences.
            </p>
            <p>
              We're breaking down traditional barriers to education by enabling peer-to-peer skill exchange, 
              making learning more accessible, affordable, and engaging for everyone.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about-section">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="about-section">
          <div className="story-content">
            <h2>Our Story</h2>
            <div className="story-text">
              <p>
                SkillSwap was born from a simple observation: in our interconnected world, 
                everyone has unique skills and knowledge, yet traditional education systems 
                often fail to connect learners with the right teachers at the right time.
              </p>
              <p>
                Founded in 2023, we started with a vision to democratize learning by creating 
                a platform where anyone can be both a teacher and a student. Whether you're 
                a professional looking to share your expertise, a student seeking to learn 
                new skills, or someone passionate about a hobby, SkillSwap provides the 
                tools and community to make meaningful connections.
              </p>
              <p>
                Today, we're proud to serve thousands of learners and teachers worldwide, 
                facilitating skill exchanges that range from professional development to 
                creative pursuits, from technical skills to life skills.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="about-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-skills">
                    {member.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="about-section">
          <h2>How SkillSwap Works</h2>
          <div className="how-it-works">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Profile</h3>
                <p>Share your skills and what you'd like to learn</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Connect with Others</h3>
                <p>Find people who can teach you or want to learn from you</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Exchange Skills</h3>
                <p>Schedule sessions and start learning together</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Grow Together</h3>
                <p>Rate your experience and continue building your skills</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="about-cta">
          <div className="cta-content">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join thousands of learners and teachers in our growing community</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">
                Get Started Today
              </Link>
              <Link to="/explore" className="btn btn-outline">
                Explore Skills
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
