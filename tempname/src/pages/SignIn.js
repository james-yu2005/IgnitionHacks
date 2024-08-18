import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

const SignIn = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const authenticate = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', username)
        .eq('password', password);

      if (error) {
        console.error('Authentication error:', error);
        return false;
      }

      if (data && data.length > 0) {
        return data[0].id;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return false;
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = await authenticate();
    console.log(user_id)
    if (user_id) {
      onLogin(); 
      navigate('/landing', { state: { user_id } });
    } else {
      alert('User and password do not match');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titleTop}>TalentTrade</h2>
      <h2 style={styles.titleBelow}>Log In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          placeholder="Username" 
          style={styles.input} 
          value={username}
          required 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={styles.input} 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '8rem', // Space below the navbar
    maxWidth: '400px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '30px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '4rem',
    minHeight: '450px', // Set a minimum height for the box
  },
  titleTop: {
    fontSize: '2.25rem',
    marginBottom: '1.5rem',
    color: '#78B7B3', 
    fontWeight: 'bold',
  },
  titleBelow: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#607F7D', 
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333', // Set the text color to dark gray (or use 'black' for black text)
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#607F7D', 
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default SignIn;
