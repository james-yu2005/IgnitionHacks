import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.text}>
        TalentTrade is a platform where you can trade your old skills for new ones. Our mission is to help people share their talents, learn new skills, and connect with others who share their passions.
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

export default About;
