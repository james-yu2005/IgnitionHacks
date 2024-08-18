import React from 'react';
import { supabase } from "../supabase/supabase"
import { useLocation } from 'react-router-dom';
import OpenAI from "openai";

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

    const skillsData = data.map(entry => `${entry.user_id}: ${entry.skills}`).join('\n');
    const  iwant = 'I want to learn martial arts from someone experienced'

    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
      dangerouslyAllowBrowser: true, 
    });
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant and the user will give you data that will contain: { user_id, skills } where the skills are the users skills that match their user_id. The user is looking for some skill to learn, which they will tell you and your job is to search the data of user_id, skill pairs to find the skills that most match the user's wishes, the describe how they match and why the user should learn from that person" },
          {
            role: "user",
            content: `This is the data: ${skillsData}. I want this to learn this type of skill: ${iwant}. Which user_id matches the task and why do their skills match my wishes?`,
          },
        ],
      });
  
      console.log(completion.choices[0].message);
    } catch (error) {
      console.error("Error:", error);
    }

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
