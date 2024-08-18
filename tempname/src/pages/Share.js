import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';
import  { insertInfo } from '../supabase/insertInfo';
import { updateInfo } from '../supabase/updateInfo';
import { getInfo } from '../supabase/getInfo';

const Share = ({ userId }) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [connect, setConnect] = useState('');
  const [hours, setHours] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [skill, setSkill] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = 'url("/allback.png")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    const getUserInfo = async () => {
      const userInfo = await getInfo(userId)
      if (userInfo) {
        const userInfo = await getInfo(userId)
        setFirstName(userInfo.name)
        setLastName(userInfo.lastname)
        setAge(userInfo.age)
        setCity(userInfo.city)
        setConnect(userInfo.connection)
        setEducation(userInfo.education)
        setSkill(userInfo.skills)
        setCode(userInfo.postal)
        setNumber(userInfo.phone)
        setHours(userInfo.hours)
        setAvailable(true);
      }
    }
    getUserInfo();
  }, [userId])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = async () => {
    if (!firstname || !lastname || !city || !education || !hours || !number || !code || !connect || !age || !skill) {
      alert('Fill in all fields')
      return;
    }
    try {
      const parsedAge = age ? parseInt(age, 10) : null;
      const parsedHours = hours ? parseInt(hours, 10) : null;

      if (isNaN(parsedAge) || isNaN(parsedHours)) {
        alert('Please enter valid numbers for age and hours.');
        return;
      }
          
      const payload = {
        user_id: userId,
        name: firstname,
        lastname,
        phone: number,
        postal: code,
        city,
        age: parsedAge,
        education,
        connection: connect,
        hours: parsedHours,
        skills: skill,
      };
      console.log(available)
      if (available) {
        await updateInfo(payload, userId)
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        await insertInfo(payload)
        setIsEditing(false);
        alert('Profile added successfully!');
      }
    } catch (error) {
      console.log('Error with profile info:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setSelectedFiles(file);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFiles === null) {
      alert('Please select file to upload or select a new file')
      return;
    }
    if (selectedFiles.length === 0) {
        alert('Please select file to upload.');
        return;
    }
    
    const file = selectedFiles;
    const fileName = `${file.name}_${new Date().toISOString()}`; 
    const folderPath = `user_id-${userId}/${fileName}`; 

    const { data, error } = await supabase
      .storage
      .from('skill_proof')
      .upload(folderPath, selectedFiles);

    setSelectedFiles(null);
    if (error) {
      console.error(`Error uploading file`, error);
    } else {
      alert(`File uploaded successfully: ${fileName}`, data);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title1}>SHARE - Create Your Profile</h2>
      <h2 style={styles.title2}>Click on "Edit" to start</h2>
      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>First name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Last name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Phone number (optional)</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Postal Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>Education</label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.selectEditable : styles.select}
          >
            <option value="" disabled selected>Select an option</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Post-graduate">Post-graduate</option>
          </select>
        </div>
        <div style={styles.column}>
          <label style={styles.label}>How do you connect?</label>
          <select
            value={connect}
            onChange={(e) => setConnect(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.selectEditable : styles.select}
          >
            <option value="" disabled selected>Select an option</option>
            <option value="In-person">In-person</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Online">Online</option>
          </select>
        </div>
        <div style={styles.column}>
          <label style={styles.label}>How many weekly hours?</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>What is your skill? Describe it in detail</label>
          <textarea
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            disabled={!isEditing}
            style={isEditing ? styles.inputEditable : styles.input}
          />
        </div>
        <div style={styles.column} className='text-black'>
          <label style={styles.label}>Supporting documents of your skill (upload one at a time - max 3)</label>
          <input className='text-black' type="file" onChange={handleFileChange} disabled={!isEditing}/>     
          <button onClick={handleFileUpload} className='border-2 bg-gray-400 border-gray-700 rounded-md'>Upload to profile</button>
          </div>
          
      </div>
      <div style={styles.buttonRow}>
        <button onClick={handleEditClick} style={styles.button}>EDIT</button>
        <button onClick={handleConfirmClick} style={styles.button} disabled={!isEditing}>CONFIRM</button>
      </div>
    </div>
  );
};

const styles = {
  
  container: {
    marginTop: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title1: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#2A4A4C',
    fontWeight: 'bold',
  },
  title2: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#2A4A4C',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    width: '100%',
  },
  column: {
    flex: '1',
    marginRight: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
    color: '#2A4A4C',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#e0e0e0',
    color: '#666',
    boxSizing: 'border-box',
  },
  inputEditable: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#000',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#e0e0e0',
    color: '#666',
    boxSizing: 'border-box',
  },
  selectEditable: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#000',
    boxSizing: 'border-box',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem',
  },
  button: {
    padding: '0.75rem 4rem',
    fontSize: '1rem',
    backgroundColor: '#011312',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default Share;
