import { React, useState } from 'react';

const Profile = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  return (
    <div className=''>
      <h2>Profile</h2>
      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <p>First name: </p>
          <input
            placeholder='first-name'
            value={firstname}
            onChange={(e) => setFirstName(e)}
          />
        </div>
          <p>Last name: </p>
          <input
            placeholder='last-name'
            value={lastname}
            onChange={(e) => setLastName(e)}
          />
        <div>
        </div>
      </div>
      
    </div>
  );
};



export default Profile;
