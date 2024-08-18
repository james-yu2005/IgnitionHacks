import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

const Profile = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('info')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        setUserData(data);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.profileTitle}>Profile</h2>
      <div style={styles.profileSection}>
        <div style={styles.userInfoContainer}>
          <p><strong>Account id:</strong> {userData.user_id}</p>
          <p><strong>Name:</strong> {userData.name} {userData.lastname}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Location:</strong> {userData.city}</p>
          <p><strong>Education:</strong> {userData.education}</p>
          {/* Display other user data as needed */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: '0 auto',
  },
  profileTitle: {
    fontSize: '2rem',
    color: '#0056b3',
  },
  profileSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  userInfoContainer: {
    flex: '2',
    textAlign: 'left',
    marginLeft: '2rem',
  },
};

export default Profile;
