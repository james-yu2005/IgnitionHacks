import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

const Profile = () => {
  const { userId } = useParams(); 
  const [userData, setUserData] = useState(null);
  const [files, setFiles] = useState([]);

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

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from('skill_proof')
          .list(`user_id-${userId}`, { recursive: false });
  
        if (error) {
          throw error;
        }

        const fileUrls = data.map(async (file) => {
          const path = `https://afsvhrnahrtjktyjmpgf.supabase.co/storage/v1/object/public/skill_proof/user_id-${userId}/${file.name}`.toString()
          return { name: file.name, url: path };
        });
  
        // Resolve all promises and update state
        const resolvedUrls = await Promise.all(fileUrls);
        setFiles(resolvedUrls);
        console.log(resolvedUrls)
      } catch (error) {
        console.error('Error fetching user documents:', error);
      }
    };

    fetchUserDocuments();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.profileTitle}>Profile</h2>
      <div style={styles.profileSection} className='flex flex-col'>
        <div style={styles.infoBox}>
          <h3 style={styles.skillTitle}>Basic Information</h3>
          <p><strong>Account id:</strong> {userData.user_id}</p>
          <p><strong>Name:</strong> {userData.name} {userData.lastname}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Location:</strong> {userData.city}</p>
          <p><strong>Education:</strong> {userData.education}</p>
          <p><strong>Phone number:</strong> {userData.phone}</p>
        </div>
        <div style={styles.skillInfoContainer}>
          <h3 style={styles.skillTitle}>Skill description</h3>
          <p><strong>Summary:</strong> {userData.skills}</p>
          <p><strong>Connection type:</strong> {userData.connection}</p>
          <p><strong>Commitment - hrs/wk:</strong> {userData.hours}</p>
          <p><strong>Uploaded files:</strong> {userData.hours}</p>
        </div>
        <div style={styles.skillInfoContainer}>
          <h3 style={styles.skillTitle}>Supporting Documents</h3>
          <ul>
            
            {files.map((file) => (
              <li key={file.name}>
                <a href={file.url} target='_blank' className='text-black hover:text-blue-400'>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
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
    maxWidth: '60%',
    margin: '0 auto',
  },
  profileTitle: {
    fontSize: '2rem',
    color: '#253534',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  profileSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch', // Ensure boxes stretch to the same height
    gap: '2rem',
  },
  infoBox: {
    flex: '1',
    textAlign: 'left',
    color: '#253534',
    backgroundColor: '#e0e0e0',
    padding: '1rem',
    paddingLeft: '2rem',
    borderRadius: '8px',
    display: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '200px', // Set a minimum height for consistency
  },
  skillInfoContainer: {
    flex: '1',
    textAlign: 'left',
    color: '#253534',
    backgroundColor: '#e0e0e0',
    padding: '1rem',
    paddingLeft: '2rem',
    borderRadius: '8px',
    display: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '200px', // Set a minimum height for consistency
  },
  skillTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
};

export default Profile;
