import React, { useEffect, useState, useRef } from 'react';
import { supabase } from "../supabase/supabase";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Connect = ({ my_user_id }) => {
  const [conversation, setConversation] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profileUserId, setProfileUserId] = useState('');
  const [history, setHistory] = useState([]);
  const api_link = process.env.REACT_APP_URL;
  const context = useRef(''); 

  const navigate = useNavigate();

  const generateFirstMessage = async () => {
    try {
      const { data, error } = await supabase
        .from('info')
        .select('skills, user_id, name, lastname, hours, connection')
        .neq('user_id', my_user_id);

      if (error) throw error;

      const skillsData = data.map(entry => 
        `Full name: ${entry.name + ' ' + entry.lastname}, 
        User ID: ${entry.user_id},
        Dedication level: ${entry.hours},
        Trading Method: ${entry.connection},
        Skill Description: ${entry.skills}`
      ).join('\n');
      

      const start_context = `You are a helpful but respectfully assertive AI assistant for a platform called Talent Trade named Talent ED. Talent Trade is a website where users can upload a portfolio demonstrating a skill they have in order to be connected to other people so that they can "swap" skills both teaching each other and "trading talents" hence the name.
When you find a possible match in the database with a skill similar to what the user is looking for, present the user_id and why they are a good match. Keep the description under 150 words. Provide the user with the match's user_ID. The user can then use this ID to view the match's portfolio and send an email requesting a connection.
If a user asks how they can connect with the person, let them know that they can enter the user_ID in the user_ID field onscreen. Use the history of the conversation, which will be provided to you alongside this context, to ensure accurate matching. The history will be divided into "users:" (what the user said) and "assistant:" (what you previously said).
Here is the database: ${skillsData}`

      context.current = start_context;

      const res = await axios.post(api_link, {
        message_from_user: "Let's start a conversation! Can you introduce yourself?",
        context_for_ai: start_context,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const returnMessage = await res.data.response;

      setHistory((prev) => [
        ...prev,
        { "user": "Let's start a conversation! Can you introduce yourself?", "assistant": returnMessage }
      ]);

      setConversation(() => [
        { role: "assistant", content: returnMessage },
      ]);

    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {
  generateFirstMessage();
 }, []);

  

  const retrieveAllSkillsButUsers = async (message_from_user) => {
    setIsLoading(true);
    
   
      try {
        const res = await axios.post(api_link, {
          message_from_user,
          context_for_ai: `Answer the question using this context: ${context.current} and this history: ${history} where it shows what the user said and Talent Ed's response`,
        });

        const returnMessage = res.data.response;

        setHistory((prev) => [
          ...prev,
          { "user": message_from_user, "assistant": returnMessage }
        ]);

        setConversation((prev) => [
          ...prev,
          { role: "user", content: message_from_user },
          { role: "assistant", content: returnMessage },
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    await retrieveAllSkillsButUsers(inputMessage);
    setInputMessage(''); // Clear the input field after sending a message
  };

  const handleViewProfile = () => {
    if (profileUserId) {
      navigate(`/profile/${profileUserId}`, { state: my_user_id });
      console.log(my_user_id)
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>CONNECT</h2>
      <div style={styles.content}>
        <div style={styles.chatSection}>
          <div style={styles.chatBox}>
            {conversation.map((msg, index) => (
              <div key={index} style={msg.role === 'user' ? styles.userMessage : styles.aiMessage}>
                <p>{msg.content}</p>
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={styles.input}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              style={styles.button}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
        <div style={styles.profileSection}>
          <h3 style={styles.profileTitle}>View Profile</h3>
          <input
            type="text"
            value={profileUserId}
            onChange={(e) => setProfileUserId(e.target.value)}
            style={styles.input}
            placeholder="Enter User ID..."
          />
          <button onClick={handleViewProfile} style={styles.viewProfileButton}>
            View Profile
          </button>
        </div>
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
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#31595B',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  chatSection: {
    flex: 2,
    marginRight: '2rem',
  },
  chatBox: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxHeight: '300px',
    overflowY: 'auto',
    color: '#000',
  },
  userMessage: {
    textAlign: 'right',
    backgroundColor: '#e0e0e0',
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0',
    color: '#000',
  },
  aiMessage: {
    textAlign: 'left',
    backgroundColor: '#cce5ff',
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0',
    color: '#000',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginRight: '10px',
    color: '#000',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#2A4A4C',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  profileSection: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#e0e0e0',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  profileTitle: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#31595B',
  },
  viewProfileButton: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#2A4A4C',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '60%', 
    marginTop: '2rem', 
  },
};

export default Connect;
