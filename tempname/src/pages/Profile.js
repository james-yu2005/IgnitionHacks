import React from 'react';

const Profile = () => {
  // Example user data, replace with real data fetch
  const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com'
  };

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  }
};

export default Profile;
