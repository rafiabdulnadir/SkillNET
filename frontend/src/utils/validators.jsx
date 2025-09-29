// Form validation helpers and rules for SkillSwap platform

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return 'Password must contain at least one special character (@$!%*?&)';
  }
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

// Name validation
export const validateName = (name, fieldName = 'Name') => {
  if (!name) {
    return `${fieldName} is required`;
  }
  if (name.length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  if (name.length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }
  return null;
};

// Phone number validation
export const validatePhone = (phone) => {
  if (!phone) {
    return null; // Phone is optional
  }
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    return 'Please enter a valid phone number';
  }
  return null;
};

// URL validation
export const validateURL = (url, fieldName = 'URL') => {
  if (!url) {
    return null; // URL is optional
  }
  try {
    new URL(url);
    return null;
  } catch {
    return `Please enter a valid ${fieldName}`;
  }
};

// Skill title validation
export const validateSkillTitle = (title) => {
  if (!title) {
    return 'Skill title is required';
  }
  if (title.length < 3) {
    return 'Skill title must be at least 3 characters long';
  }
  if (title.length > 100) {
    return 'Skill title must be less than 100 characters';
  }
  return null;
};

// Skill description validation
export const validateSkillDescription = (description) => {
  if (!description) {
    return 'Skill description is required';
  }
  if (description.length < 20) {
    return 'Description must be at least 20 characters long';
  }
  if (description.length > 1000) {
    return 'Description must be less than 1000 characters';
  }
  return null;
};

// Bio validation
export const validateBio = (bio) => {
  if (!bio) {
    return null; // Bio is optional
  }
  if (bio.length > 500) {
    return 'Bio must be less than 500 characters';
  }
  return null;
};

// Rating validation
export const validateRating = (rating) => {
  if (!rating) {
    return 'Rating is required';
  }
  const numRating = Number(rating);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    return 'Rating must be between 1 and 5';
  }
  return null;
};

// Message validation
export const validateMessage = (message) => {
  if (!message) {
    return 'Message is required';
  }
  if (message.length < 1) {
    return 'Message cannot be empty';
  }
  if (message.length > 1000) {
    return 'Message must be less than 1000 characters';
  }
  return null;
};

// Location validation
export const validateLocation = (location) => {
  if (!location) {
    return null; // Location is optional
  }
  if (location.length > 100) {
    return 'Location must be less than 100 characters';
  }
  return null;
};

// Age validation
export const validateAge = (age) => {
  if (!age) {
    return null; // Age is optional
  }
  const numAge = Number(age);
  if (isNaN(numAge) || numAge < 13 || numAge > 120) {
    return 'Age must be between 13 and 120';
  }
  return null;
};

// File validation
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    required = false
  } = options;

  if (!file) {
    return required ? 'File is required' : null;
  }

  if (file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
  }

  if (!allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }

  return null;
};

// Generic required field validation
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

// Generic length validation
export const validateLength = (value, min, max, fieldName = 'Field') => {
  if (!value) return null;
  
  const length = value.length;
  if (min && length < min) {
    return `${fieldName} must be at least ${min} characters long`;
  }
  if (max && length > max) {
    return `${fieldName} must be less than ${max} characters`;
  }
  return null;
};

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Real-time validation helper
export const createValidator = (validationFn) => {
  return (value) => {
    try {
      return validationFn(value);
    } catch (error) {
      console.error('Validation error:', error);
      return 'Validation failed';
    }
  };
};

// Async validation helper (for checking uniqueness, etc.)
export const createAsyncValidator = (asyncValidationFn) => {
  return async (value) => {
    try {
      return await asyncValidationFn(value);
    } catch (error) {
      console.error('Async validation error:', error);
      return 'Validation failed';
    }
  };
};

// Common validation rules object
export const validationRules = {
  email: [validateRequired, validateEmail],
  password: [validateRequired, validatePassword],
  name: [validateRequired, validateName],
  skillTitle: [validateRequired, validateSkillTitle],
  skillDescription: [validateRequired, validateSkillDescription],
  rating: [validateRequired, validateRating],
  message: [validateRequired, validateMessage],
};

// Export all validators as default
export default {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validatePhone,
  validateURL,
  validateSkillTitle,
  validateSkillDescription,
  validateBio,
  validateRating,
  validateMessage,
  validateLocation,
  validateAge,
  validateFile,
  validateRequired,
  validateLength,
  validateForm,
  createValidator,
  createAsyncValidator,
  validationRules
};
