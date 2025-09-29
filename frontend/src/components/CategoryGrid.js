import React from 'react';

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: 'Tutoring & Education',
      icon: '📚',
      skillCount: 245,
      color: '#3b82f6',
      description: 'Academic subjects, test prep, and educational support'
    },
    {
      id: 2,
      name: 'Technology & Coding',
      icon: '💻',
      skillCount: 189,
      color: '#10b981',
      description: 'Programming, web development, and tech skills'
    },
    {
      id: 3,
      name: 'Gardening & Plants',
      icon: '🌱',
      skillCount: 156,
      color: '#059669',
      description: 'Plant care, landscaping, and sustainable gardening'
    },
    {
      id: 4,
      name: 'Cooking & Baking',
      icon: '👨‍🍳',
      skillCount: 132,
      color: '#f59e0b',
      description: 'Culinary arts, baking, and international cuisines'
    },
    {
      id: 5,
      name: 'Art & Design',
      icon: '🎨',
      skillCount: 98,
      color: '#8b5cf6',
      description: 'Visual arts, graphic design, and creative expression'
    },
    {
      id: 6,
      name: 'Fitness & Health',
      icon: '💪',
      skillCount: 87,
      color: '#ef4444',
      description: 'Personal training, nutrition, and wellness coaching'
    },
    {
      id: 7,
      name: 'Music & Performance',
      icon: '🎵',
      skillCount: 76,
      color: '#ec4899',
      description: 'Musical instruments, singing, and performance arts'
    },
    {
      id: 8,
      name: 'Photography',
      icon: '📸',
      skillCount: 65,
      color: '#6366f1',
      description: 'Digital photography, editing, and visual storytelling'
    },
    {
      id: 9,
      name: 'Auto & Repair',
      icon: '🚗',
      skillCount: 54,
      color: '#f97316',
      description: 'Vehicle maintenance, repair, and automotive skills'
    },
    {
      id: 10,
      name: 'Healthcare & Wellness',
      icon: '❤️',
      skillCount: 43,
      color: '#dc2626',
      description: 'Medical skills, therapy, and holistic wellness'
    },
    {
      id: 11,
      name: 'Math & Sciences',
      icon: '🧮',
      skillCount: 89,
      color: '#0ea5e9',
      description: 'Mathematics, physics, chemistry, and scientific research'
    },
    {
      id: 12,
      name: 'Languages',
      icon: '🌍',
      skillCount: 67,
      color: '#14b8a6',
      description: 'Foreign languages, translation, and cultural exchange'
    }
  ];

  const handleCategoryClick = (category) => {
    // TODO: Navigate to category page or filter skills
    console.log('Category clicked:', category.name);
  };

  return (
    <section className="category-grid-section">
      <div className="container">
        <div className="category-header">
          <h2 className="category-title">Browse by Category</h2>
          <p className="category-subtitle">
            Discover skills across diverse categories, from academic tutoring to creative
            arts and practical life skills.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
              style={{ '--category-color': category.color }}
            >
              <div className="category-icon">
                <span className="icon-emoji">{category.icon}</span>
              </div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.skillCount} skills available</p>
              </div>
              <div className="category-hover-overlay">
                <p className="category-description">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
