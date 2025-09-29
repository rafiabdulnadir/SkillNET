import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useTheme, ThemeToggle } from "../contexts/ThemeContext";
import "../styles/component.css";


import {
  navSlide,
  mobileMenuSlide,
  buttonHover,
  iconHover,
  dropdownMenu,
} from "../utils/animations";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".nav-menu") &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
      if (
        !event.target.closest(".profile-dropdown") &&
        !event.target.closest(".profile-button")
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
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
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 px-4 transition-all duration-300
        ${
          isScrolled
            ? "backdrop-blur-md bg-white/70 dark:bg-matte-black/70 shadow-lg border-b-2 border-blue-500/60"
            : "bg-transparent"
        }`}
      {...navSlide}
    >
      <div className="nav-container max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <motion.div {...iconHover} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl"
            onClick={closeMenus}
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              🔄
            </motion.span>
            <span className="logo-text text-blue-600 dark:text-blue-400">
              SkillNet
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`nav-link ${
              isActive("/") && location.pathname === "/" ? "active" : ""
            }`}
            onClick={closeMenus}
          >
            🏠 Home
          </Link>
          <Link
            to="/explore"
            className={`nav-link ${isActive("/explore") ? "active" : ""}`}
            onClick={closeMenus}
          >
            🔍 Explore
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                onClick={closeMenus}
              >
                📊 Dashboard
              </Link>
              <Link
                to="/messages"
                className={`nav-link ${isActive("/messages") ? "active" : ""}`}
                onClick={closeMenus}
              >
                💬 Messages
              </Link>
            </>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle className="theme-toggle-nav" showLabel={false} />

          {isAuthenticated ? (
            <>
              {/* Add Skill Button */}
              <Link
                to="/add-skill"
                className="btn btn-primary btn-sm hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-blue-500 hover:shadow-md hover:scale-105 transition"
                onClick={closeMenus}
              >
                ➕ Add Skill
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.button
                  className="flex items-center gap-2 profile-button"
                  onClick={toggleProfile}
                  {...buttonHover}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full bg-blue-500 text-white font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block font-medium">
                    {user?.name}
                  </span>
                  <motion.span
                    className="text-sm"
                    animate={{ rotate: isProfileOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden bg-white/80 dark:bg-matte-black/80 backdrop-blur border border-blue-500/50 shadow-xl z-40"
                      {...dropdownMenu}
                    >
                      <Link to="/profile" className="dropdown-item">
                        👤 My Profile
                      </Link>
                      <Link to="/settings" className="dropdown-item">
                        ⚙️ Settings
                      </Link>
                      <Link to="/notifications" className="dropdown-item">
                        🔔 Notifications
                      </Link>
                      <div className="border-t border-blue-300/30 my-1"></div>
                      <button
                        className="dropdown-item text-red-500"
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="demo-login-btn px-3 py-1.5 rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition"
                onClick={handleDemoLogin}
              >
                🚀 Demo
              </button>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            className="mobile-menu-toggle md:hidden flex flex-col justify-center gap-1.5 p-2 rounded-lg border-2 border-blue-500"
            onClick={toggleMenu}
            {...buttonHover}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="hamburger"
            >
              <motion.span
                className="hamburger-line"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 5 },
                }}
              />
              <motion.span
                className="hamburger-line"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.span
                className="hamburger-line"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -5 },
                }}
              />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="mobile-menu md:hidden" {...mobileMenuSlide}>
            <div className="mobile-menu-content p-4 bg-white/80 dark:bg-matte-black/80 backdrop-blur border-t-2 border-blue-500/60 shadow-lg rounded-b-xl">
              <div className="mobile-nav-links flex flex-col gap-2">
                <Link
                  to="/"
                  className={`mobile-nav-link ${
                    isActive("/") && location.pathname === "/" ? "active" : ""
                  }`}
                  onClick={closeMenus}
                >
                  🏠 Home
                </Link>
                <Link
                  to="/explore"
                  className={`mobile-nav-link ${
                    isActive("/explore") ? "active" : ""
                  }`}
                  onClick={closeMenus}
                >
                  🔍 Explore
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className={`mobile-nav-link ${
                        isActive("/dashboard") ? "active" : ""
                      }`}
                      onClick={closeMenus}
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      to="/add-skill"
                      className={`mobile-nav-link ${
                        isActive("/add-skill") ? "active" : ""
                      }`}
                      onClick={closeMenus}
                    >
                      ➕ Add Skill
                    </Link>
                    <Link
                      to="/messages"
                      className={`mobile-nav-link ${
                        isActive("/messages") ? "active" : ""
                      }`}
                      onClick={closeMenus}
                    >
                      💬 Messages
                    </Link>
                    <Link
                      to="/profile"
                      className={`mobile-nav-link ${
                        isActive("/profile") ? "active" : ""
                      }`}
                      onClick={closeMenus}
                    >
                      👤 Profile
                    </Link>
                    <Link
                      to="/settings"
                      className={`mobile-nav-link ${
                        isActive("/settings") ? "active" : ""
                      }`}
                      onClick={closeMenus}
                    >
                      ⚙️ Settings
                    </Link>
                    <div className="mobile-menu-divider border-t border-blue-300/30 my-2"></div>
                    <button
                      className="mobile-nav-link text-red-500"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mobile-menu-divider border-t border-blue-300/30 my-2"></div>
                    <button
                      className="mobile-nav-link demo-link"
                      onClick={handleDemoLogin}
                    >
                      🚀 Demo Login
                    </button>
                    <Link
                      to="/login"
                      className={`mobile-nav-link ${
                        isActive("/login") ? "active" : ""
                      }`}
                      onClick={closeMenus}
                    >
                      🔑 Login
                    </Link>
                    <Link
                      to="/register"
                      className={`mobile-nav-link ${
                        isActive("/register") ? "active" : ""
                      }`}
                      onClick={closeMenus}
                    >
                      ✨ Get Started
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
