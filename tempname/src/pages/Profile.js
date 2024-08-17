import React from 'react';

const Profile = () => {
  // Example user data, replace with real data fetch
  const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    joinedDate: 'January 1, 2023',
    bio: 'A passionate learner and developer.',
    profilePicture: 'https://via.placeholder.com/150' // Placeholder image
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile</h2>
      <div style={styles.profileCard}>
        <img src={user.profilePicture} alt="Profile" style={styles.profilePicture} />
        <div style={styles.userInfo}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {user.joinedDate}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '5rem', // Space below the navbar
    maxWidth: '600px',
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
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '1rem',
  },
  userInfo: {
    fontSize: '16px',
    color: '#333',
  },
  infoItem: {
    marginBottom: '0.5rem',
  }
};

export default Profile;
