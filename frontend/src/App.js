import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import './styles/App.css';
import './styles/responsive.css';
import './styles/components.css';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-skill" 
                  element={
                    <ProtectedRoute>
                      <AddSkill />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit-skill/:id" 
                  element={
                    <ProtectedRoute>
                      <AddSkill />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/messages" 
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/messages/:userId" 
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/ratings" 
                  element={
                    <ProtectedRoute>
                      <Ratings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/ratings/:userId" 
                  element={<Ratings />} 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
