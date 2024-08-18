import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <section style={styles.heroSection}>
        <h1 style={styles.title}> </h1>
        <p style={styles.subtitle}></p>
        <Link to="/signup" style={styles.signUpButton}>Sign Up Now!</Link>
        <p style={styles.loginText}>
          or <Link to="/signin" style={styles.loginLink}>Log in here</Link>
        </p>
      </section>

      <section style={styles.whatWeDoSection}>
  <h2 style={styles.sectionTitle1}> </h2>

  </section>
      <section style={styles.differentSection}>
        <h2 style={styles.sectionTitle2}> </h2>
  </section>

    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#333',
    padding: '0', // Remove padding
    margin: '0', // Remove margin
    width: '100%', // Ensure full-width container
  },
  title: {
    fontSize: '4rem',
    marginBottom: '20px',
    fontFamily: "'Cormorant Infant', serif",
  },
  subtitle: {
    fontSize: '2rem',
    marginBottom: '45px',
    fontFamily: "'Cormorant Infant', serif",
  },signUpButton: {
    backgroundColor: '#000000',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'inline-block',
    cursor: 'pointer',
    position: 'absolute', // Position the button absolutely within its container
    bottom: '300px', // Position it 20px from the bottom of the container
    left: '50%', // Center horizontally
    transform: 'translateX(-50%)', // Correct centering by moving back 50% of the button's width
  },
  heroSection: {
    position: 'relative', // Make sure the parent container is positioned relatively
    textAlign: 'center',
    padding: '100px 20px',
    backgroundImage: `url('/images/silhouettes.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    minHeight: '100vh',
    color: 'white',
  },
  loginText: {
    position: 'absolute', // Position the login text absolutely
    bottom: '270px', // Position it 20px from the bottom of the container
    left: '50%', // Center horizontally
    transform: 'translateX(-50%)', // Correct centering by moving back 50% of the text's width
    fontSize: '16px',
  },
  loginLink: {
    color: 'white',
    textDecoration: 'underline',
  },
  whatWeDoSection: {
    backgroundImage: `url('/background2.png')`, // Set the path to your background image
    backgroundSize: 'cover', // Ensure the image covers the entire section
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    padding: '60px 0',
    textAlign: 'center',
    width: '100%', // Ensure full-width
    color: '#fff', // Adjust text color if needed for contrast
  },
  differentSection: {
    backgroundImage: `url('/background3.png')`, // Set the path to your background image
    backgroundSize: 'cover', // Ensure the image covers the entire section
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    padding: '60px 0',
    textAlign: 'center',
    width: '100%', // Ensure full-width
    color: '#fff', // Adjust text color if needed for contrast
  },
  sectionTitle1: {
    fontSize: '2.5rem',
    marginBottom: '40px',
    marginTop: '700px',
    color: '#000',
    fontWeight: 'bold',
  },
  sectionTitle2: {
    fontSize: '2.5rem',
    marginBottom: '40px',
    marginTop: '700px',
    color: '#000',
    fontWeight: 'bold',
  },
};

export default Home;
