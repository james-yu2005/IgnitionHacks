import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.leftSection}>
        <Link to="/" style={styles.logoLink}>
          <img src="/path-to-your-logo.png" alt="Logo" style={styles.logo} />
        </Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/services" style={styles.link}>Services</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>
      <div style={styles.rightSection}>
        <button style={styles.languageSwitcher}>EN</button>
        {isAuthenticated ? (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <Link to="/settings" style={styles.link}>Settings</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(68,126,123, 0.50)', // Darker turquoise
    color: 'white',
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
    backgroundColor: '#0056b3', // Dark blue color
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '20px', // Rounded edges
    cursor: 'pointer',
    fontSize: '16px',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default NavBar;
