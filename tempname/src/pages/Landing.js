import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const user_id = location.state?.user_id;
  

  console.log(user_id)
  const handleShareLink = () => {
    navigate('/share', { state: { user_id } });
  }

  const handleConnectLink = () => {
    navigate('/connect', { state: { user_id } });
  }
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>What would you like to do?</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleShareLink}>Share a Skill</button>
        <button style={styles.button} onClick={handleConnectLink}>Connect with Others</button>
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
