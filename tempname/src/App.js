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
import Landing from './pages/Landing'; // Import the new Landing component
import Settings from './pages/Settings';
import ContactUs from './components/ContactUs';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

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
            element={isAuthenticated ? <Share /> : <Navigate to="/signin" />}
          />
          <Route 
            path="/connect"
            element={<Connect />}
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
