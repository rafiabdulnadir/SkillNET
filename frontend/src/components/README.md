# SkillSwap Components Documentation

This directory contains reusable React components for the SkillSwap platform.

## New Components (PR #8)

### SkillBadge
A versatile badge component for displaying skills with various styles and interactions.

**Props:**
- `skill` (string|object) - The skill to display
- `variant` (string) - Style variant: 'default', 'primary', 'secondary', 'success', 'warning', 'danger', 'outline'
- `size` (string) - Size: 'small', 'medium', 'large'
- `removable` (boolean) - Show remove button
- `onRemove` (function) - Callback when remove button is clicked
- `onClick` (function) - Callback when badge is clicked
- `className` (string) - Additional CSS classes

**Usage:**
```jsx
import SkillBadge from './components/SkillBadge';

// Simple skill badge
<SkillBadge skill="React" variant="primary" />

// Skill with level and remove functionality
<SkillBadge 
  skill={{ name: "JavaScript", level: 4, description: "Advanced JavaScript" }}
  variant="success"
  removable
  onRemove={(skill) => console.log('Remove', skill)}
/>
```

### UserAvatar
A flexible avatar component with fallback initials, online status, and rating display.

**Props:**
- `user` (object) - User object with name, avatar, isOnline, rating
- `size` (string) - Size: 'small', 'medium', 'large', 'xlarge'
- `showOnlineStatus` (boolean) - Display online/offline indicator
- `showRating` (boolean) - Display user rating
- `className` (string) - Additional CSS classes
- `onClick` (function) - Callback when avatar is clicked

**Usage:**
```jsx
import UserAvatar from './components/UserAvatar';

<UserAvatar 
  user={{
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
    isOnline: true,
    rating: 4.5
  }}
  size="large"
  showOnlineStatus
  showRating
  onClick={(user) => console.log('User clicked', user)}
/>
```

## New Hooks (PR #8)

### useLocalStorage
A custom hook for managing localStorage with React state synchronization.

**Usage:**
```jsx
import useLocalStorage from '../hooks/useLocalStorage';

const [value, setValue] = useLocalStorage('key', 'defaultValue');
```

### useDebounce
A custom hook for debouncing values to optimize performance.

**Usage:**
```jsx
import useDebounce from '../hooks/useDebounce';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

## New Utilities (PR #8)

### formatters.js
Comprehensive formatting utilities for dates, numbers, text, and more.

**Available Functions:**
- `formatDate(date, options)` - Format dates
- `formatRelativeTime(date)` - Relative time (e.g., "2 hours ago")
- `formatNumber(num, options)` - Number formatting
- `formatCurrency(amount, currency)` - Currency formatting
- `formatPercentage(value, decimals)` - Percentage formatting
- `truncateText(text, maxLength, suffix)` - Text truncation
- `capitalizeFirst(str)` - Capitalize first letter
- `capitalizeWords(str)` - Capitalize all words
- `slugify(text)` - Create URL-friendly slugs
- `formatFileSize(bytes)` - File size formatting
- `formatRating(rating, maxRating)` - Rating with stars
- `formatPhoneNumber(phoneNumber)` - Phone number formatting

**Usage:**
```jsx
import { formatDate, formatCurrency, truncateText } from '../utils/formatters';

const formattedDate = formatDate(new Date());
const price = formatCurrency(29.99);
const shortText = truncateText("Long text here...", 50);
```

## Existing Components

### Core Components
- `Navbar` - Main navigation with demo login functionality
- `Footer` - Site footer with links and information
- `LoadingSpinner` - Loading indicator
- `Modal` - Modal dialog component
- `ErrorBoundary` - Error boundary for React components

### Feature Components
- `HeroSection` - Homepage hero section
- `SkillsSection` - Skills showcase section
- `SuccessStories` - User testimonials
- `CTASection` - Call-to-action sections
- `SearchBar` - Search functionality
- `SkillFilter` - Skill filtering
- `SkillCard` - Individual skill display
- `LocationPicker` - Location selection with maps
- `ChatBubble` - Chat message display
- `NotificationBell` - Notification indicator
- `Pagination` - Page navigation
- `ProtectedRoute` - Route protection

## Styling

All components use CSS classes defined in:
- `styles/App.css` - Main application styles
- `styles/components.css` - Component-specific styles
- `styles/theme.css` - Theme variables and utilities
- `styles/responsive.css` - Responsive design rules

## Best Practices

1. **Props Validation**: Use PropTypes or TypeScript for prop validation
2. **Accessibility**: Include ARIA labels and keyboard navigation
3. **Performance**: Use React.memo for expensive components
4. **Reusability**: Design components to be flexible and reusable
5. **Testing**: Write unit tests for complex components
6. **Documentation**: Keep this README updated with new components
