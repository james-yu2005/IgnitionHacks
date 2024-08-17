import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Share from './pages/Share';
import Connect from './pages/Connect';
import Profile from './pages/Profile';
import Landing from './pages/Landing'; // Import the new Landing component
import Settings from './pages/Settings';
import ContactUs from './components/ContactUs';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasShared, setHasShared] = useState(false); // Track if the user has shared their profile

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasShared(false); // Reset when logging out
  };

  const handleProfileShared = () => setHasShared(true); // Update when profile is shared

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/landing" 
            element={isAuthenticated ? <Landing /> : <Navigate to="/signin"/>} 
          />
          <Route
            path="/share"
            element={isAuthenticated ? <Share onProfileShared={handleProfileShared} /> : <Navigate to="/signin" />}
          />
          <Route 
            path="/connect"
            element={hasShared ? <Connect /> : <Navigate to="/landing" />}
          />
          <Route 
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />}
          />
        </Routes>
      </main>
      <ContactUs /> {/* This will render the Contact Us form at the bottom of every page */}
    </Router>
  );
};

export default App;
