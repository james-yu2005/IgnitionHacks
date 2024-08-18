import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import emailjs, { send } from 'emailjs-com';
import { useLocation } from 'react-router-dom';

const Profile = ({ my_id }) => {
  const { userId } = useParams(); 
  const [userData, setUserData] = useState(null);
  const [files, setFiles] = useState([]);
  const [myFiles, setMyFiles] = useState([]);
  const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const template_id = process.env.REACT_APP_EMAIL_TEMPLATE_ID_2;
  const user_id = process.env.REACT_APP_EMAIL_USER_ID;
  let links = [];
  console.log(my_id)

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
          links.concat(path)
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

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from('skill_proof')
          .list(`user_id-${my_id}`, { recursive: false });
  
        if (error) {
          throw error;
        }

        const fileUrls = data.map(async (file) => {
          const path = `https://afsvhrnahrtjktyjmpgf.supabase.co/storage/v1/object/public/skill_proof/user_id-${my_id}/${file.name}`.toString()
          links.concat(path)
          return { name: file.name, url: path };
        });
  
        const resolvedUrls = await Promise.all(fileUrls);
        setMyFiles(resolvedUrls);
        console.log(resolvedUrls)
      } catch (error) {
        console.error('Error fetching user documents:', error);
      }
    };

    fetchUserDocuments();
  }, [my_id]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  
  const fetchEmail = async (id) => {
    const { data } = await supabase
      .from('users')
      .select('email')
      .eq('id', id)

    if (data) {
      return data[0];
    }
  }

  const fetchName = async (id) => {
    const { data } = await supabase
      .from('info')
      .select('name, lastname')
      .eq('user_id', id)
      
    return data[0]
  }
  const fetchAllUserData = async (id) => {
    const { data } = await supabase
      .from('info')
      .select('*')
      .eq('user_id', id)
    return data[0];
  }

  const handleSubmit = async () => {
    const send_email= await fetchEmail(userId)
    const my_email = await fetchEmail(my_id)
    const allData = await fetchAllUserData(my_id)
    const send_name = await fetchName(my_id)
    const full_name = send_name.name + ' ' + send_name.lastname
    const templateParams = {
      email: send_email.email,
      age: allData.age,
      city: allData.city,
      education: allData.education,
      time: allData.hours,
      connection: userData.connection,
      skills: allData.skills,
      reply_to: my_email.email,
      full_name: full_name,
      to_name:userData.name + ' ' + userData.lastname,
      links: myFiles.map(file => `${file.name}: ${file.url}`).join(', ')
    }
    emailjs.send(service_id, template_id, templateParams, user_id)
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        alert('Email sent successfully. Please chek your email and wait to hear back!')
      }, (error) => {
        console.log('Error sending email:', error);
      });
    
  }

  

  return (
    <div style={styles.container}>
      <div className='flex flex-row'>
        <h2 style={styles.profileTitle}>Profile</h2>
        <button className=' mb-6 ml-auto px-2 bg-teal-400 rounded-lg hover:bg-teal-300' onClick={handleSubmit}>Connect with user</button>
      </div>
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
                <a href={file.url} target='_blank' className='text-black hover:text-blue-400' rel="noreferrer">
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
    textAlign: 'left'
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
