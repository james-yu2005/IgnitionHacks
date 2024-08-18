import React from 'react';

const Contact = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.text}>
        We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
      </p>
      <p style={styles.text}>
        Email: contact@talenttrade.com
      </p>
      <p style={styles.text}>
        Phone: +1 (234) 567-890
      </p>
    </div>
  );
};

const styles = {
  container: {
    color: 'white',
    textAlign: 'center',
    padding: '100px 20px',
    minHeight: '100vh',
    fontFamily: "'Akaya Telivigala', cursive",
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
};

export default Contact;

