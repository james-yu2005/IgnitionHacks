import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assume authentication is successful
    onLogin();
    navigate('/profile');
  };

  return (
    <div style={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Username" style={styles.input} required />
        <input type="password" placeholder="Password" style={styles.input} required />
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.5rem',
    width: '200px',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  }
};

export default SignIn;
