import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('skillswap-theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);
    setIsLoading(false);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('skillswap-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('skillswap-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Set specific theme
  const setSpecificTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
      localStorage.setItem('skillswap-theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  // Reset to system preference
  const resetToSystem = () => {
    localStorage.removeItem('skillswap-theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemPreference);
    document.documentElement.setAttribute('data-theme', systemPreference);
  };

  // Get theme colors for dynamic styling
  const getThemeColors = () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return {
      primary: computedStyle.getPropertyValue('--color-primary').trim(),
      secondary: computedStyle.getPropertyValue('--color-secondary').trim(),
      background: computedStyle.getPropertyValue('--color-background').trim(),
      surface: computedStyle.getPropertyValue('--color-surface').trim(),
      text: computedStyle.getPropertyValue('--color-text').trim(),
      textSecondary: computedStyle.getPropertyValue('--color-text-secondary').trim(),
      border: computedStyle.getPropertyValue('--color-border').trim(),
      success: computedStyle.getPropertyValue('--color-success').trim(),
      warning: computedStyle.getPropertyValue('--color-warning').trim(),
      error: computedStyle.getPropertyValue('--color-error').trim(),
    };
  };

  const value = {
    theme,
    isLoading,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme: setSpecificTheme,
    resetToSystem,
    getThemeColors,
  };

  // Show loading state while theme is being determined
  if (isLoading) {
    return (
      <div className="theme-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Theme toggle button component
export const ThemeToggle = ({ className = '', showLabel = true }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-icon">
        {isDark ? '☀️' : '🌙'}
      </span>
      {showLabel && (
        <span className="theme-toggle-label">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

// Theme selector component for settings
export const ThemeSelector = () => {
  const { theme, setTheme, resetToSystem } = useTheme();
  const [selectedOption, setSelectedOption] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('skillswap-theme');
    if (savedTheme) {
      setSelectedOption(savedTheme);
    } else {
      setSelectedOption('system');
    }
  }, [theme]);

  const handleThemeChange = (option) => {
    setSelectedOption(option);
    
    if (option === 'system') {
      resetToSystem();
    } else {
      setTheme(option);
    }
  };

  const options = [
    { value: 'light', label: 'Light Mode', icon: '☀️' },
    { value: 'dark', label: 'Dark Mode', icon: '🌙' },
    { value: 'system', label: 'System Default', icon: '💻' },
  ];

  return (
    <div className="theme-selector">
      <h4 className="theme-selector-title">Theme Preference</h4>
      <div className="theme-options">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            className={`theme-option ${selectedOption === option.value ? 'active' : ''}`}
          >
            <span className="theme-option-icon">{option.icon}</span>
            <span className="theme-option-label">{option.label}</span>
            {selectedOption === option.value && (
              <span className="theme-option-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeContext;
