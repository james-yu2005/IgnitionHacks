import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function SignUp() {
    const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID
    const template_id = process.env.REACT_APP_EMAIL_TEMPLATE_ID
    const user_id = process.env.REACT_APP_EMAIL_USER_ID
    
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define template parameters
    const templateParams = {
      email: email,
      message: "hello there"
      // Include additional parameters if needed for the template
    };

    // Send confirmation email
    emailjs.send(service_id, template_id, templateParams, user_id)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setStatus('Confirmation email sent! Please check your inbox.');
      }, (error) => {
        console.log('Error sending email:', error);
        setStatus('Failed to send confirmation email.');
      });
  };

  return (
    <div>
      <h2>Confirm Your Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Confirmation</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default SignUp;
