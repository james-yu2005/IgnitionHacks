import React from 'react';

const Settings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update logic here (e.g., API call)
    alert('Settings updated successfully!');
  };

  return (
    <div style={styles.container}>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" placeholder="Update Email" style={styles.input} required />
        <input type="password" placeholder="New Password" style={styles.input} required />
        <button type="submit" style={styles.button}>Update Settings</button>
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

export default Settings;
