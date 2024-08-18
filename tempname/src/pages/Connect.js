import React from 'react';
import { supabase } from "../supabase/supabase"
import { useLocation } from 'react-router-dom';

const Connect = () => {
  const location = useLocation();
  const user_id = (location.state?.user_id);
  console.log(user_id)
  const retrieveAllSkillsButUsers = async () => {
    const { data, error } = await supabase
      .from('info')
      .select('skills, user_id')
      .neq('user_id', user_id);

    if (error) {
      console.log(error)
    }
    console.log(data)
  }
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Connect with Others</h2>
      <p>This section will help you connect with others based on your profile.</p>
      <button className='bg-blue-700' onClick={retrieveAllSkillsButUsers}>get</button>
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
};

export default Connect;
