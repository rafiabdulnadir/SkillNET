import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddSkill from './pages/AddSkill';
import Messages from './pages/Messages';
import Ratings from './pages/Ratings';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import HelpCenter from './pages/HelpCenter';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import { pageTransitions } from './utils/animations';
import './styles/theme.css';
import './styles/App.css';
import './styles/responsive.css';
import './styles/components.css';

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={
          <motion.div {...pageTransitions}>
            <Home />
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div {...pageTransitions}>
            <Login />
          </motion.div>
        } />
        <Route path="/register" element={
          <motion.div {...pageTransitions}>
            <Register />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div {...pageTransitions}>
            <About />
          </motion.div>
        } />
        <Route path="/contact" element={
          <motion.div {...pageTransitions}>
            <Contact />
          </motion.div>
        } />
        <Route path="/help" element={
          <motion.div {...pageTransitions}>
            <HelpCenter />
          </motion.div>
        } />
        <Route path="/terms" element={
          <motion.div {...pageTransitions}>
            <Terms />
          </motion.div>
        } />
        <Route path="/privacy" element={
          <motion.div {...pageTransitions}>
            <PrivacyPolicy />
          </motion.div>
        } />
        <Route path="/explore" element={
          <motion.div {...pageTransitions}>
            <Explore />
          </motion.div>
        } />
        <Route path="/search" element={
          <motion.div {...pageTransitions}>
            <SearchResults />
          </motion.div>
        } />

        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <Profile />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/profile/:userId" element={
          <motion.div {...pageTransitions}>
            <Profile />
          </motion.div>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <Dashboard />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/add-skill" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <AddSkill />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/edit-skill/:id" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <AddSkill />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <Messages />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/messages/:userId" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <Messages />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <Notifications />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/ratings" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <Ratings />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/ratings/:userId" element={
          <motion.div {...pageTransitions}>
            <Ratings />
          </motion.div>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <motion.div {...pageTransitions}>
              <Settings />
            </motion.div>
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <motion.div {...pageTransitions}>
              <AdminPanel />
            </motion.div>
          </ProtectedRoute>
        } />

        {/* 404 Route */}
        <Route path="*" element={
          <motion.div {...pageTransitions}>
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App theme-transition">
              <Navbar />
              <main className="main-content">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
