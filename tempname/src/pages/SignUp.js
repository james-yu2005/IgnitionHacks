import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

function SignUp() {
  const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const template_id = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
  const user_id = process.env.REACT_APP_EMAIL_USER_ID;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const { data: check, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1)

    if (checkError) {
      console.log(checkError)
    }

    if (check && check.length > 0) {
      alert('This email already exists, please sign in instead');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit code
    setGeneratedCode(code);

    const templateParams = {
      email: email,
      message: `Your verification code is: ${code}`,
    };

    emailjs.send(service_id, template_id, templateParams, user_id)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setStatus('Confirmation email sent! Please check your inbox.');
      }, (error) => {
        console.log('Error sending email:', error);
        setStatus('Failed to send confirmation email.');
      });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    if (verificationCode === generatedCode) {
      setIsVerified(true);
      setStatus('Email verified successfully!');
    } else {
      setStatus('Verification code is incorrect. Please try again.');
    }
  };

  const verifyPasswords = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setStatus('Passwords do not match.');
      return;
    }
    setPasswordVerified(true);
    setStatus('Password successfully set.');
  };

  const addEmailPasswordData = async (e) => {
    e.preventDefault();
    try {
      const currentTimestamp = new Date().toISOString();

      const { data, error } = await supabase
        .from('users')
        .insert([{ email, password, currentTimestamp }]);

      if (error) throw error;

      const userId = data[0].id; // Get the user.id from the inserted data

      navigate('/profile', { state: { user_id } });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>

      {!isVerified ? (
        <>
          <form onSubmit={handleEmailSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Send Confirmation</button>
          </form>

          {generatedCode && (
            <form onSubmit={handleVerificationSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Verify Code</button>
            </form>
          )}
        </>
      ) : (
        <>
          <p style={styles.successMessage}>{status}</p>
          <form onSubmit={verifyPasswords} style={styles.form}>
            <input
              type="password"
              placeholder="Enter password"
              className="focus:outline-none border-2 border-gray-400 rounded-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Re-enter password"
              className="focus:outline-none border-2 border-gray-400 rounded-sm"
              onChange={(e) => setRePassword(e.target.value)}
              value={rePassword}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Set Password</button>
          </form>
          {passwordVerified && (
            <>
              <button
                onClick={addEmailPasswordData}
                style={{ ...styles.button, backgroundColor: '#28a745' }} // Green button when password is verified
              >
                Proceed to Profile
              </button>
            </>
          )}
        </>
      )}

      <p style={styles.status}>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '5rem', // Space below the navbar
    maxWidth: '400px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#0056b3', // Dark blue color
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  input: {
    margin: '0.5rem 0',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    color: '#333', // Set the text color to dark gray (or use 'black' for black text)
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0056b3', // Dark blue color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  },
  status: {
    marginTop: '1rem',
    fontSize: '14px',
    color: '#333',
  },
  successMessage: {
    fontSize: '16px',
    color: '#28a745', // Green for success messages
  },
};

export default SignUp;
