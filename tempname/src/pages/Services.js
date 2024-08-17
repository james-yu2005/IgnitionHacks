import React from 'react';

const Services = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Services</h1>
      <p style={styles.text}>
        We offer a variety of services to help you learn and share skills. From workshops to one-on-one mentoring, TalentTrade is your go-to platform for skill development and networking.
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

export default Services;
