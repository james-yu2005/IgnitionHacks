import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';

const Profile = ({ userId }) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [connect, setConnect] = useState('');
  const [hours, setHours] = useState('');  // This now represents the level of dedication
  const [skill, setSkill] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await supabase
        .from('info')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (userInfo.data) {
        const userData = userInfo.data;
        setFirstName(userData.name);
        setLastName(userData.lastname);
        setAge(userData.age);
        setCity(userData.city);
        setConnect(userData.connection);
        setEducation(userData.education);
        setSkill(userData.skills);
        setCode(userData.postal);
        setNumber(userData.phone);
        setHours(userData.hours);
        if (userData.profile_image_url) {
          setProfileImageUrl(userData.profile_image_url);
        }
      }
    };
    getUserInfo();
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleProfileImageUpload = async () => {
    if (!selectedFile) return;

    const fileName = `profile_${userId}_${new Date().toISOString()}`;
    const { data, error } = await supabase
      .storage
      .from('profile_pictures')
      .upload(fileName, selectedFile);

    if (error) {
      console.error('Error uploading profile picture:', error);
    } else {
      const imageUrl = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(fileName).publicURL;

      await supabase
        .from('info')
        .update({ profile_image_url: imageUrl })
        .eq('user_id', userId);

      setProfileImageUrl(imageUrl);
      setSelectedFile(null);
      alert('Profile picture uploaded successfully!');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.profileTitle}>Profile</h2>
      <div style={styles.profileSection}>
        <div style={styles.profilePictureContainer}>
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="Profile" style={styles.profilePicture} />
          ) : (
            <div style={styles.placeholder}>
              <p>No Profile Image</p>
            </div>
          )}
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleProfileImageUpload} style={styles.uploadButton}>Upload Profile Picture</button>
        </div>
        <div style={styles.userInfoContainer}>
          <p><strong>Account id:</strong> {userId}</p>
          <p><strong>Name:</strong> {firstname} {lastname}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Location:</strong> {city}</p>
          <p><strong>Education:</strong> {education}</p>
          <button style={styles.logoutButton}>Log Out</button>
        </div>
      </div>
      <div style={styles.skillSection}>
        <div style={styles.skillInfo}>
          <h3>Your Skill:</h3>
          <p>{skill}</p>
          <p><strong>Status:</strong> Unconnected</p>
          <p><strong>Commitment Type:</strong> {hours}</p>
          <p><strong>Connection Type:</strong> {connect}</p>
        </div>
        <div style={styles.skillShowBoard}>
          <h3>Skill Show Board</h3>
          <div style={styles.skillIcons}>
            <img src="/icon1.png" alt="Skill 1" />
            <img src="/icon2.png" alt="Skill 2" />
            <img src="/icon3.png" alt="Skill 3" />
          </div>
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
  profilePictureContainer: {
    flex: '1',
    textAlign: 'center',
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
  },
  placeholder: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  uploadButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  userInfoContainer: {
    flex: '2',
    textAlign: 'left',
    marginLeft: '2rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  skillSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  skillInfo: {
    flex: '1',
    textAlign: 'left',
  },
  skillShowBoard: {
    flex: '1',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  skillIcons: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

export default Profile;
