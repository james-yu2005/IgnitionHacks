import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, userId, handleLogout }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.leftSection}>
        <Link to="/" style={styles.logoLink}>
          <img src="https://cdn.discordapp.com/attachments/1274199397097406565/1274360821144879167/Screenshot_2024-08-17_at_09.34.41-removebg-preview.png?ex=66c1f880&is=66c0a700&hm=2ffafdb5bb8b4d077932ecf89b9529f28771cc002535283c0bfaf73769e2eca4&" alt="Logo" style={styles.logo} />
        </Link>
        
      </div>
      <div style={styles.rightSection}>
        
        {isAuthenticated ? (
          <>
            <Link to="/landing" style={styles.link}>Landing</Link>
            <Link to={`/profile/${userId}`}>Profile</Link>
            <button onClick={handleLogout} style={styles.link}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" style={styles.loginLink}>Log In</Link>
            <Link to="/signup" style={styles.getStartedButton}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed', // Ensures the navbar stays fixed at the top
    top: 0, // Positions the navbar at the top of the viewport
    left: 0, // Aligns the navbar to the left edge
    width: '100%', // Ensures the navbar spans the entire width of the screen
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#447e7b', // Darker turquoise without opacity
    color: 'white',
    zIndex: 1000, // Ensures the navbar stays on top of other content
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Adds a slight shadow for better separation from content
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logoLink: {
    marginRight: '2rem',
  },
  logo: {
    height: '40px',
  },
  link: {
    margin: '0 1rem',
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  languageSwitcher: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  loginLink: {
    color: 'white',
    textDecoration: 'underline',
    fontSize: '16px',
    marginRight: '1rem',
  },
  getStartedButton: {
    backgroundColor: '#000000', // Dark blue color
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '20px', // Rounded edges
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default NavBar;
