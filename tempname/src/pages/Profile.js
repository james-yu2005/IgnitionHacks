import { React, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState(0);
  const [education, setEducation] = useState('');
  const [connect, setConnect] = useState('');
  const [hours, setHours] = useState(0);

  const location = useLocation();
  const userId = location.state?.user_id;  // Correct key reference
  console.log(userId)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('info')
        .insert([{
          user_id: userId, 
          name: firstname,
          lastname,
          phone:number,
          postal:code,
          city,
          age,
          education,
          connection:connect,
          hours,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      if (data) {
        alert('Profile info saved successfully!');
      }
      // You can navigate to another page or show a success message
    } catch (error) {
      console.log('Error saving profile info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <p>First name: </p>
          <input
            placeholder='Ex. John'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className='text-black'
          />
        </div>
        <div className='flex flex-col'>
          <p>Last name: </p>
          <input
            placeholder='Ex. Doe'
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className='text-black'
          />
        </div>
        <div className='flex flex-col'>
          <p>Phone number (optional)</p>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className='text-black'
            placeholder='phone number'
          />
        </div>
      </div>
      <div className='flex flex-row'>
        
        <div className='flex flex-col'>
          <p>City</p>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='text-black'
            placeholder='Ex. Markham'
          />
        </div>
        <div className='flex flex-col'>
          <p>Postal Code</p>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='text-black'
            placeholder='Ex. L9B 3C7'
          />
        </div>
        <div className='flex flex-col'>
          <p>Age: </p>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className='text-black'
            type='number'
            placeholder='Ex. 19'
          />
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col text-black'>
          <p>Education </p>
          <select value={education} onChange={(e) => setEducation(e.target.value)}>
            <option value="High School" className='text-black'>High School</option>
            <option value="Undergraduate" className='text-black'>Undergraduate</option>
            <option value="Post-graduate" className='text-black'>Post-graduate</option>
          </select>
        </div>
        <div className='flex flex-col text-black'>
          <p>How do you want to connect?</p>
          <select value={connect} onChange={(e) => setConnect(e.target.value)}>
            <option value="In-person" className='text-black'>In-person</option>
            <option value="Hybrid" className='text-black'>Hybrid</option>
            <option value="Online" className='text-black'>Online</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <p>How many hours are you willing to commit (per week) ?</p>
          <input
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder='Ex. 2'
            type='nunmber'
            className='text-black'
          />
        </div>
      </div>
      <button type='submit'>submit</button>
    </form>
  )
}

export default Profile;