import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>What would you like to do?</h2>
      <div style={styles.buttonContainer}>
        <Link to="/share" style={styles.button}>Share a Skill</Link>
        <Link to="/connect" style={styles.button}>Connect with Others</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '5rem',
    textAlign: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.25rem',
    backgroundColor: '#0056b3',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default Landing;
