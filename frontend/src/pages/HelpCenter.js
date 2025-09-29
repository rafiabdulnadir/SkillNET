import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 24 },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀', count: 6 },
    { id: 'account', name: 'Account & Profile', icon: '👤', count: 5 },
    { id: 'skills', name: 'Skills & Learning', icon: '🎯', count: 7 },
    { id: 'messaging', name: 'Messaging & Chat', icon: '💬', count: 4 },
    { id: 'safety', name: 'Safety & Security', icon: '🛡️', count: 2 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first skill listing?',
      answer: 'To create your first skill listing, go to your profile and click "Add Skill". Fill in the skill details, set your availability, and choose whether you want to exchange for another skill or offer it for free.',
      helpful: 45,
      tags: ['skills', 'profile', 'beginner']
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'How does skill exchange work?',
      answer: 'Skill exchange allows you to trade your expertise for someone else\'s. For example, you might teach someone web development in exchange for learning graphic design. Both parties benefit by sharing knowledge.',
      helpful: 38,
      tags: ['exchange', 'learning', 'teaching']
    },
    {
      id: 3,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to Settings > Profile to update your personal information, bio, skills, and profile picture. Make sure to save your changes when you\'re done.',
      helpful: 32,
      tags: ['profile', 'settings', 'update']
    },
    {
      id: 4,
      category: 'skills',
      question: 'Can I offer multiple skills?',
      answer: 'Yes! You can add as many skills as you\'d like to your profile. Each skill can have its own description, level, and availability settings.',
      helpful: 29,
      tags: ['skills', 'multiple', 'profile']
    },
    {
      id: 5,
      category: 'messaging',
      question: 'How do I message other users?',
      answer: 'Click on any user\'s profile and select "Send Message" or use the chat bubble in the bottom right corner to access your conversations.',
      helpful: 27,
      tags: ['messaging', 'chat', 'communication']
    },
    {
      id: 6,
      category: 'safety',
      question: 'How do you ensure user safety?',
      answer: 'We have a rating system, user verification, and community guidelines. Always meet in public places for in-person sessions and report any inappropriate behavior.',
      helpful: 41,
      tags: ['safety', 'security', 'guidelines']
    }
  ];

  const guides = [
    {
      title: 'Complete Beginner\'s Guide to SkillSwap',
      description: 'Everything you need to know to get started with skill sharing',
      duration: '10 min read',
      category: 'getting-started',
      popular: true
    },
    {
      title: 'Creating an Effective Skill Profile',
      description: 'Tips for writing compelling skill descriptions that attract learners',
      duration: '5 min read',
      category: 'skills',
      popular: true
    },
    {
      title: 'Safety Guidelines for Skill Sessions',
      description: 'Best practices for safe and productive learning sessions',
      duration: '7 min read',
      category: 'safety',
      popular: false
    },
    {
      title: 'Building Your Reputation on SkillSwap',
      description: 'How to earn positive ratings and build trust in the community',
      duration: '6 min read',
      category: 'account',
      popular: false
    }
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="help-center-page">
      <div className="container">
        {/* Header */}
        <div className="help-header">
          <h1>Help Center</h1>
          <p>Find answers to your questions and learn how to make the most of SkillSwap</p>
          
          {/* Search */}
          <div className="help-search">
            <SearchBar
              placeholder="Search for help articles, FAQs, and guides..."
              onSearch={handleSearch}
              showSuggestions={false}
              size="large"
            />
          </div>
        </div>

        <div className="help-content">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <a href="/contact" className="action-card">
                <div className="action-icon">📧</div>
                <h3>Contact Support</h3>
                <p>Get help from our support team</p>
              </a>
              <a href="/profile" className="action-card">
                <div className="action-icon">👤</div>
                <h3>Update Profile</h3>
                <p>Manage your account settings</p>
              </a>
              <a href="/add-skill" className="action-card">
                <div className="action-icon">➕</div>
                <h3>Add a Skill</h3>
                <p>Share your expertise with others</p>
              </a>
              <a href="/explore" className="action-card">
                <div className="action-icon">🔍</div>
                <h3>Find Skills</h3>
                <p>Discover new learning opportunities</p>
              </a>
            </div>
          </div>

          {/* Popular Guides */}
          <div className="popular-guides">
            <h2>Popular Guides</h2>
            <div className="guides-grid">
              {guides.map((guide, index) => (
                <div key={index} className={`guide-card ${guide.popular ? 'popular' : ''}`}>
                  {guide.popular && <div className="popular-badge">Popular</div>}
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                  <div className="guide-meta">
                    <span className="duration">{guide.duration}</span>
                    <span className="category">{categories.find(c => c.id === guide.category)?.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories and FAQs */}
          <div className="help-main">
            {/* Categories Sidebar */}
            <div className="help-sidebar">
              <h3>Browse by Category</h3>
              <div className="category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="help-faqs">
              <div className="faqs-header">
                <h2>
                  {selectedCategory === 'all' 
                    ? 'Frequently Asked Questions' 
                    : `${categories.find(c => c.id === selectedCategory)?.name} Questions`
                  }
                </h2>
                <p>{filteredFaqs.length} articles found</p>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No articles found</h3>
                  <p>Try adjusting your search terms or browse different categories.</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="btn btn-outline"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="faq-list">
                  {filteredFaqs.map(faq => (
                    <div key={faq.id} className="faq-item">
                      <div className="faq-question">
                        <h3>{faq.question}</h3>
                        <div className="faq-meta">
                          <span className="helpful-count">👍 {faq.helpful} helpful</span>
                          <div className="faq-tags">
                            {faq.tags.map(tag => (
                              <span key={tag} className="tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                      <div className="faq-actions">
                        <button className="btn btn-small btn-outline">
                          👍 Helpful
                        </button>
                        <button className="btn btn-small btn-outline">
                          👎 Not helpful
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Support */}
          <div className="help-contact">
            <div className="contact-card">
              <h2>Still need help?</h2>
              <p>Can't find what you're looking for? Our support team is here to help.</p>
              <div className="contact-actions">
                <a href="/contact" className="btn btn-primary">
                  Contact Support
                </a>
                <a href="mailto:support@skillswap.com" className="btn btn-outline">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
