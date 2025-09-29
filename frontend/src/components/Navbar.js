import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, ThemeToggle } from '../contexts/ThemeContext';
import { 
  navSlide, 
  mobileMenuSlide, 
  buttonHover, 
  iconHover,
  dropdownMenu 
} from '../utils/animations';

const Navbar = () => {
  const { user, logout, demoLogin, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMenuOpen(false);
      }
      if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleDemoLogin = () => {
    demoLogin();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      {...navSlide}
    >
      <div className="nav-container">
        {/* Logo */}
        <motion.div {...iconHover} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="nav-logo" onClick={closeMenus}>
            <motion.span 
              className="logo-icon"
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              🔄
            </motion.span>
            <span className="logo-text">SkillSwap</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="nav-center">
          <div className="nav-links">
            <motion.div {...buttonHover}>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <span className="nav-icon">🏠</span>
                Home
              </Link>
            </motion.div>
            
            <motion.div {...buttonHover}>
              <Link 
                to="/explore" 
                className={`nav-link ${isActive('/explore') ? 'active' : ''}`}
                onClick={closeMenus}
              >
                <span className="nav-icon">🔍</span>
                Explore
              </Link>
            </motion.div>

            {isAuthenticated && (
              <>
                <motion.div {...buttonHover}>
                  <Link 
                    to="/dashboard" 
                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                    onClick={closeMenus}
                  >
                    <span className="nav-icon">📊</span>
                    Dashboard
                  </Link>
                </motion.div>
                
                <motion.div {...buttonHover}>
                  <Link 
                    to="/messages" 
                    className={`nav-link ${isActive('/messages') ? 'active' : ''}`}
                    onClick={closeMenus}
                  >
                    <span className="nav-icon">💬</span>
                    Messages
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <motion.div {...buttonHover}>
            <ThemeToggle className="theme-toggle-nav" showLabel={false} />
          </motion.div>

          {isAuthenticated ? (
            <>
              {/* Add Skill Button */}
              <motion.div {...buttonHover}>
                <Link 
                  to="/add-skill" 
                  className="btn btn-primary btn-sm add-skill-btn"
                  onClick={closeMenus}
                >
                  <span className="btn-icon">➕</span>
                  Add Skill
                </Link>
              </motion.div>

              {/* Profile Dropdown */}
              <div className="profile-dropdown-container">
                <motion.button
                  className="profile-button"
                  onClick={toggleProfile}
                  {...buttonHover}
                >
                  <div className="profile-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span className="avatar-placeholder">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="profile-name">{user?.name}</span>
                  <motion.span 
                    className="dropdown-arrow"
                    animate={{ rotate: isProfileOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      className="profile-dropdown"
                      {...dropdownMenu}
                    >
                      <Link to="/profile" className="dropdown-item" onClick={closeMenus}>
                        <span className="dropdown-icon">👤</span>
                        My Profile
                      </Link>
                      <Link to="/settings" className="dropdown-item" onClick={closeMenus}>
                        <span className="dropdown-icon">⚙️</span>
                        Settings
                      </Link>
                      <Link to="/notifications" className="dropdown-item" onClick={closeMenus}>
                        <span className="dropdown-icon">🔔</span>
                        Notifications
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item logout-item" onClick={handleLogout}>
                        <span className="dropdown-icon">🚪</span>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <motion.button 
                className="demo-login-btn"
                onClick={handleDemoLogin}
                title="Try SkillSwap with demo user - no signup required!"
                {...buttonHover}
              >
                <span className="btn-icon">🚀</span>
                Demo Login
              </motion.button>
              
              <motion.div {...buttonHover}>
                <Link 
                  to="/login" 
                  className="btn btn-outline btn-sm"
                  onClick={closeMenus}
                >
                  Login
                </Link>
              </motion.div>
              
              <motion.div {...buttonHover}>
                <Link 
                  to="/register" 
                  className="btn btn-primary btn-sm"
                  onClick={closeMenus}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            {...buttonHover}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="hamburger"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 5 }
                }}
                className="hamburger-line"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="hamburger-line"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -5 }
                }}
                className="hamburger-line"
              />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            {...mobileMenuSlide}
          >
            <div className="mobile-menu-content">
              <div className="mobile-nav-links">
                <Link to="/" className={`mobile-nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`} onClick={closeMenus}>
                  <span className="nav-icon">🏠</span>
                  Home
                </Link>
                <Link to="/explore" className={`mobile-nav-link ${isActive('/explore') ? 'active' : ''}`} onClick={closeMenus}>
                  <span className="nav-icon">🔍</span>
                  Explore
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={closeMenus}>
                      <span className="nav-icon">📊</span>
                      Dashboard
                    </Link>
                    <Link to="/add-skill" className={`mobile-nav-link ${isActive('/add-skill') ? 'active' : ''}`} onClick={closeMenus}>
                      <span className="nav-icon">➕</span>
                      Add Skill
                    </Link>
                    <Link to="/messages" className={`mobile-nav-link ${isActive('/messages') ? 'active' : ''}`} onClick={closeMenus}>
                      <span className="nav-icon">💬</span>
                      Messages
                    </Link>
                    <Link to="/profile" className={`mobile-nav-link ${isActive('/profile') ? 'active' : ''}`} onClick={closeMenus}>
                      <span className="nav-icon">👤</span>
                      Profile
                    </Link>
                    <Link to="/settings" className={`mobile-nav-link ${isActive('/settings') ? 'active' : ''}`} onClick={closeMenus}>
                      <span className="nav-icon">⚙️</span>
                      Settings
                    </Link>
                    <div className="mobile-menu-divider"></div>
                    <button className="mobile-nav-link logout-link" onClick={handleLogout}>
                      <span className="nav-icon">🚪</span>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mobile-menu-divider"></div>
                    <button className="mobile-nav-link demo-link" onClick={handleDemoLogin}>
                      <span className="nav-icon">🚀</span>
                      Demo Login
                    </button>
                    <Link to="/login" className={`mobile-nav-link ${isActive('/login') ? 'active' : ''}`} onClick={closeMenus}>
                      <span className="nav-icon">🔑</span>
                      Login
                    </Link>
                    <Link to="/register" className={`mobile-nav-link register-link ${isActive('/register') ? 'active' : ''}`} onClick={closeMenus}>
                      <span className="nav-icon">✨</span>
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
