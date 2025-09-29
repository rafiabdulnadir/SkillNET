// ===== FRAMER MOTION ANIMATION PRESETS =====

// Page transition animations
export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

export const slideTransitions = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

export const scaleTransitions = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Component animations
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  },
  hover: { 
    scale: 1.02, 
    y: -4,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  transition: { duration: 0.1, ease: "easeInOut" }
};

export const iconHover = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 5, scale: 1.1 },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Dropdown animations
export const dropdownMenu = {
  initial: { opacity: 0, scale: 0.95, y: -10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
  transition: { duration: 0.15, ease: "easeOut" }
};

// List animations
export const listContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const listItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Loading animations
export const spinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Notification animations
export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const slideInTop = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { duration: 0.3, ease: "easeOut" }
};

export const slideInBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Form animations
export const formField = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: "easeOut" }
};

export const errorShake = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};

// Micro-interactions
export const ripple = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { scale: 4, opacity: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export const wiggle = {
  animate: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.5 }
  }
};

// Navigation animations
export const navSlide = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2, ease: "easeOut" }
};

export const mobileMenuSlide = {
  initial: { opacity: 0, x: "-100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Tab animations
export const tabContent = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2, ease: "easeInOut" }
};

// Search animations
export const searchExpand = {
  initial: { width: "2.5rem" },
  animate: { width: "20rem" },
  exit: { width: "2.5rem" },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Progress animations
export const progressBar = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Skeleton loading
export const skeletonPulse = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Chat message animations
export const messageSlideIn = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Floating action button
export const fabHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 90 },
  tap: { scale: 0.95 },
  transition: { duration: 0.2, ease: "easeInOut" }
};

// Accordion animations
export const accordionContent = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Tooltip animations
export const tooltip = {
  initial: { opacity: 0, scale: 0.8, y: 5 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8, y: 5 },
  transition: { duration: 0.15, ease: "easeOut" }
};

// Custom easing functions
export const customEasing = {
  spring: { type: "spring", stiffness: 300, damping: 30 },
  smooth: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  bounce: { type: "spring", stiffness: 400, damping: 10 },
  gentle: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
};

// Viewport animations (for scroll-triggered animations)
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  viewport: { once: true }
};

// Export all animations as a single object for easy importing
export const animations = {
  pageTransitions,
  slideTransitions,
  scaleTransitions,
  cardHover,
  buttonHover,
  iconHover,
  modalBackdrop,
  modalContent,
  dropdownMenu,
  listContainer,
  listItem,
  spinner,
  pulse,
  slideInRight,
  slideInLeft,
  slideInTop,
  slideInBottom,
  formField,
  errorShake,
  ripple,
  bounce,
  wiggle,
  navSlide,
  mobileMenuSlide,
  tabContent,
  searchExpand,
  progressBar,
  skeletonPulse,
  messageSlideIn,
  fabHover,
  accordionContent,
  tooltip,
  customEasing,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer
};

export default animations;
