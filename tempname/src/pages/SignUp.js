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

  const addEmailPasswordData = async () => {
    try {
      console.log(supabase)
      const { data, error } = await supabase
        .from('users')
        .insert({ email: email, password: password });

      
    } catch (error) {
      console.log(error)
    }
    navigate('/profile')
  }
  const handleEmailSubmit = (e) => {
    e.preventDefault();

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
      // Proceed to the next step or registration completion
    } else {
      setStatus('Verification code is incorrect. Please try again.');
    }
  };

  const verifyPasswords = (e) => {
    e.preventDefault()
    if (password !== rePassword) {
      window.alert('Passwords do not match')
    }
    setPasswordVerified(true)
  }
  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>

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
          <form onSubmit={(e) => verifyPasswords(e)} className='flex flex-col'>
            <input
              placeholder='Enter password'
              className='mt-1 focus:outline-none border-2 border-gray-400 rounded-sm'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              placeholder='Re-enter password'
              className='focus:outline-none border-2 border-gray-400 rounded-sm'
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
            <button className='border-2 border-black w-[10rem] justify-center'>set as password</button>
          </form>
          {passwordVerified && 'Password successfully set'}
          {passwordVerified ? (
            <>
              <button
                onClick={addEmailPasswordData}
                className='bg-green-400'
              >
                Proceed to Profile
              </button>
            </>
          ): (
            <>
              <button
                className='bg-gray-400'
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
    maxWidth: '400px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
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
  },
  status: {
    marginTop: '1rem',
    fontSize: '14px',
    color: '#333',
  },
  successMessage: {
    fontSize: '16px',
    color: '#28a745',
  },
};

export default SignUp;
