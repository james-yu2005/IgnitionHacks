import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>EXPLORE MORE</h1>
      <p style={styles.subtitle}>Trade Old Skills for New Skills</p>
      <Link to="/signup" style={styles.signUpButton}>Sign Up Now!</Link>
      <p style={styles.loginText}>
        or <Link to="/signin" style={styles.loginLink}>Log in here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#78b7b3', // Turquoise
    color: 'white',
    textAlign: 'center',
    padding: '100px 20px',
    backgroundImage: `url('/silhouettes.png')`, // Relative URL from public folder
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    minHeight: '100vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
  },
  signUpButton: {
    backgroundColor: '#0056b3', // Dark blue color
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '30px', // Rounded edges
    textDecoration: 'none',
    fontSize: '18px',
    display: 'inline-block',
    cursor: 'pointer',
  },
  loginText: {
    marginTop: '20px',
    fontSize: '16px',
  },
  loginLink: {
    color: 'white',
    textDecoration: 'underline',
  },
};

export default Home;
