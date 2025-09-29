// Global constants and configuration for SkillSwap platform

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:7001',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Authentication
export const AUTH_CONFIG = {
  TOKEN_KEY: 'skillswap_token',
  REFRESH_TOKEN_KEY: 'skillswap_refresh_token',
  USER_KEY: 'skillswap_user',
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  REMEMBER_ME_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Theme Configuration
export const THEME_CONFIG = {
  STORAGE_KEY: 'skillswap-theme',
  DEFAULT_THEME: 'light',
  THEMES: ['light', 'dark', 'system'],
};

// Skill Categories
export const SKILL_CATEGORIES = [
  { id: 'web-development', name: 'Web Development', icon: '💻', color: 'blue' },
  { id: 'mobile-development', name: 'Mobile Development', icon: '📱', color: 'green' },
  { id: 'data-science', name: 'Data Science', icon: '📊', color: 'purple' },
  { id: 'design', name: 'Design', icon: '🎨', color: 'pink' },
  { id: 'marketing', name: 'Marketing', icon: '📈', color: 'orange' },
  { id: 'photography', name: 'Photography', icon: '📸', color: 'yellow' },
  { id: 'music', name: 'Music', icon: '🎵', color: 'red' },
  { id: 'languages', name: 'Languages', icon: '🌍', color: 'teal' },
  { id: 'cooking', name: 'Cooking', icon: '👨‍🍳', color: 'amber' },
  { id: 'fitness', name: 'Fitness', icon: '💪', color: 'emerald' },
  { id: 'business', name: 'Business', icon: '💼', color: 'slate' },
  { id: 'writing', name: 'Writing', icon: '✍️', color: 'indigo' },
];

// Skill Levels
export const SKILL_LEVELS = [
  { id: 'beginner', name: 'Beginner', description: 'Just starting out', color: 'green' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some experience', color: 'yellow' },
  { id: 'advanced', name: 'Advanced', description: 'Highly experienced', color: 'orange' },
  { id: 'expert', name: 'Expert', description: 'Professional level', color: 'red' },
];

// Availability Types
export const AVAILABILITY_TYPES = [
  { id: 'online', name: 'Online', icon: '💻', description: 'Virtual sessions' },
  { id: 'in-person', name: 'In-Person', icon: '🤝', description: 'Face-to-face meetings' },
  { id: 'both', name: 'Both', icon: '🔄', description: 'Online and in-person' },
];

// Price Types
export const PRICE_TYPES = [
  { id: 'free', name: 'Free', icon: '🆓', description: 'No cost' },
  { id: 'exchange', name: 'Skill Exchange', icon: '🔄', description: 'Trade skills' },
  { id: 'paid', name: 'Paid', icon: '💰', description: 'Monetary payment' },
];

// Rating System
export const RATING_CONFIG = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  RATING_LABELS: {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  },
  RATING_COLORS: {
    1: 'red',
    2: 'orange',
    3: 'yellow',
    4: 'lime',
    5: 'green'
  }
};

// Pagination
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [6, 12, 24, 48],
  MAX_VISIBLE_PAGES: 7,
};

// File Upload
export const FILE_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  PROFILE_IMAGE_SIZE: { width: 400, height: 400 },
  SKILL_IMAGE_SIZE: { width: 800, height: 600 },
};

// Notification Types
export const NOTIFICATION_TYPES = {
  MESSAGE: 'message',
  SKILL_REQUEST: 'skill_request',
  RATING: 'rating',
  SYSTEM: 'system',
  ACHIEVEMENT: 'achievement',
  SESSION_REMINDER: 'session_reminder',
  PAYMENT: 'payment',
};

// Notification Settings
export const NOTIFICATION_CONFIG = {
  AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
  MAX_NOTIFICATIONS: 50,
  MARK_READ_DELAY: 2000, // 2 seconds
};

// Search Configuration
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300, // 300ms
  MIN_SEARCH_LENGTH: 2,
  MAX_SUGGESTIONS: 8,
  RECENT_SEARCHES_LIMIT: 5,
};

// Chat Configuration
export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 1000,
  TYPING_INDICATOR_TIMEOUT: 3000, // 3 seconds
  MESSAGE_BATCH_SIZE: 20,
  AUTO_SCROLL_THRESHOLD: 100, // pixels from bottom
};

// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  RECENT_ACTIVITY_LIMIT: 10,
  UPCOMING_SESSIONS_LIMIT: 5,
  SKILL_PROGRESS_LIMIT: 5,
  RECOMMENDATIONS_LIMIT: 3,
};

// Form Validation
export const VALIDATION_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
  SKILL_TITLE_MIN_LENGTH: 3,
  SKILL_TITLE_MAX_LENGTH: 100,
  SKILL_DESCRIPTION_MIN_LENGTH: 20,
  SKILL_DESCRIPTION_MAX_LENGTH: 1000,
  MESSAGE_MAX_LENGTH: 1000,
};

// Date and Time
export const DATE_CONFIG = {
  DEFAULT_LOCALE: 'en-US',
  DATE_FORMAT: 'MMM dd, yyyy',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'MMM dd, yyyy HH:mm',
  TIMEZONE: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/skillswap',
  TWITTER: 'https://twitter.com/skillswap',
  INSTAGRAM: 'https://instagram.com/skillswap',
  LINKEDIN: 'https://linkedin.com/company/skillswap',
  YOUTUBE: 'https://youtube.com/skillswap',
  GITHUB: 'https://github.com/skillswap',
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'hello@skillswap.com',
  SUPPORT_EMAIL: 'support@skillswap.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Skill Street, Learning City, LC 12345',
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_CHAT: true,
  ENABLE_VIDEO_CALLS: false,
  ENABLE_PAYMENTS: false,
  ENABLE_GROUPS: false,
  ENABLE_EVENTS: false,
  ENABLE_CERTIFICATIONS: false,
  ENABLE_ANALYTICS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_LOCATION_SERVICES: true,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  SKILL_CREATED: 'Skill created successfully!',
  SKILL_UPDATED: 'Skill updated successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  RATING_SUBMITTED: 'Rating submitted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  EMAIL_VERIFIED: 'Email verified successfully!',
};

// Loading Messages
export const LOADING_MESSAGES = {
  LOADING: 'Loading...',
  SAVING: 'Saving...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...',
  SENDING: 'Sending...',
  UPDATING: 'Updating...',
  DELETING: 'Deleting...',
};

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'skillswap_token',
  REFRESH_TOKEN: 'skillswap_refresh_token',
  USER_DATA: 'skillswap_user',
  THEME: 'skillswap_theme',
  LANGUAGE: 'skillswap_language',
  RECENT_SEARCHES: 'skillswap_recent_searches',
  DRAFT_MESSAGES: 'skillswap_draft_messages',
  PREFERENCES: 'skillswap_preferences',
};

// Environment Variables
export const ENV_VARS = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:7001',
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
  ANALYTICS_ID: process.env.REACT_APP_ANALYTICS_ID,
};

// Application Metadata
export const APP_METADATA = {
  NAME: 'SkillSwap',
  VERSION: '1.0.0',
  DESCRIPTION: 'Connect, Learn, and Share Skills',
  AUTHOR: 'SkillSwap Team',
  KEYWORDS: ['skills', 'learning', 'teaching', 'exchange', 'community'],
  URL: 'https://skillswap.com',
};

// Export all constants as default
export default {
  API_CONFIG,
  AUTH_CONFIG,
  THEME_CONFIG,
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  AVAILABILITY_TYPES,
  PRICE_TYPES,
  RATING_CONFIG,
  PAGINATION_CONFIG,
  FILE_UPLOAD_CONFIG,
  NOTIFICATION_TYPES,
  NOTIFICATION_CONFIG,
  SEARCH_CONFIG,
  CHAT_CONFIG,
  DASHBOARD_CONFIG,
  VALIDATION_CONFIG,
  DATE_CONFIG,
  SOCIAL_LINKS,
  CONTACT_INFO,
  FEATURE_FLAGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
  REGEX_PATTERNS,
  STORAGE_KEYS,
  ENV_VARS,
  APP_METADATA,
};
