import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useLocation } from 'react-router-dom';
import { getInfo } from '../supabase/getInfo';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const userId = location.state?.user_id;

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = await getInfo(userId);
      setProfile(userInfo);
    };

    fetchProfile();
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Profile</h2>
      <div style={styles.profileInfo}>
        <p><strong>First Name:</strong> {profile.name}</p>
        <p><strong>Last Name:</strong> {profile.lastname}</p>
        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>Postal Code:</strong> {profile.postal}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Education:</strong> {profile.education}</p>
        <p><strong>How you want to connect:</strong> {profile.connection}</p>
        <p><strong>Hours per week:</strong> {profile.hours}</p>
        <p><strong>Skill:</strong> {profile.skills}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '5rem',
    padding: '2rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#0056b3',
  },
  profileInfo: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default Profile;
