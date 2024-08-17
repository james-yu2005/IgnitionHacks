import { React, useState } from 'react';
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
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAuthenticated = await authenticate();

    if (isAuthenticated) {
      onLogin(); // Set the authenticated state in App component
      navigate('/profile'); 
    } else {
      alert('User and password do not match');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          placeholder="Username" 
          style={styles.input} 
          required 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={styles.input} 
          required 
          onChange={(e) => setPassword(e.target.value)} 
        />
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
