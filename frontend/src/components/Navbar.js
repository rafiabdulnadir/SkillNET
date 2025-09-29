import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <span className="logo-icon">🔄</span>
          SkillSwap
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Browse Skills
          </Link>

          {isAuthenticated ? (
            <>
              <Link 
                to="/add-skill" 
                className={`nav-link ${isActive('/add-skill') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Add Skill
              </Link>
              <Link 
                to="/messages" 
                className={`nav-link ${isActive('/messages') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Messages
              </Link>
              <Link 
                to="/profile" 
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Profile
              </Link>
              <div className="nav-user-info">
                <span className="user-name">Hi, {user?.name}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`nav-link register-link ${isActive('/register') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

