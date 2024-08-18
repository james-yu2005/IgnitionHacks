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
import Profile from './pages/Profile';
import ContactUs from './components/ContactUs';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(''); // Store the authenticated user ID
  const [user, setUser] = useState([]);

  const handleLogin = (id) => {
    setIsAuthenticated(true);
    setUserId(id); // Set the userId after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(''); // Clear the userId on logout
  };

  return (
    <React.StrictMode> {/* Wrap everything in StrictMode */}
      <Router>
        <NavBar isAuthenticated={isAuthenticated} userId={userId} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn onLogin={handleLogin} setUserId={setUserId} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/landing" 
              element={isAuthenticated ? <Landing /> : <Navigate to="/signin"/>} 
            />
            <Route
              path="/share"
              element={isAuthenticated ? <Share userId={userId} setUser={setUser}/> : <Navigate to="/signin" />}
            />
            <Route 
              path="/connect"
              element={isAuthenticated ? <Connect my_user_id={userId}/> : <Navigate to="/signin" />}
            />
            <Route 
              path="/profile/:userId"
              element={<Profile my_id={userId}/>}
            />
          </Routes>
        </main>
        <ContactUs /> {/* This will render the Contact Us form at the bottom of every page */}
      </Router>
    </React.StrictMode>
  );
};

export default App;
