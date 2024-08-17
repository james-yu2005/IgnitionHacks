import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const template_id = process.env.REACT_APP_CONTACT_TEMPLATE_ID;
  const user_id = process.env.REACT_APP_EMAIL_USER_ID;

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    emailjs.send(service_id, template_id, templateParams, user_id)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setStatus('Thank you! Your message has been sent.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, (error) => {
        console.log('Error sending email:', error);
        setStatus('Failed to send your message. Please try again.');
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Us</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#447e7b',
    padding: '2rem',
    color: 'black',
    textAlign: 'center',
    marginTop: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
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
    maxWidth: '500px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    margin: '0.5rem 0',
    padding: '0.75rem',
    width: '100%',
    maxWidth: '500px',
    height: '100px',
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
  },
};

export default ContactUs;
