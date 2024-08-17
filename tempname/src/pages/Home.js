import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Our App</h1>
      <p>This is the home page. Feel free to navigate through the app using the links above.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  }
};

export default Home;
