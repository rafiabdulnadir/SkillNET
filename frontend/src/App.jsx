import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import AddSkill from './pages/AddSkill.jsx';
import Messages from './pages/Messages.jsx';
import Ratings from './pages/Ratings.jsx';
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
