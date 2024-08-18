import React, { useEffect, useState, useRef } from 'react';
import { supabase } from "../supabase/supabase";
import axios from 'axios';

const Connect = ({ userId }) => {

  const [conversation, setConversation] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const retrieveAllSkillsButUsers = async (message) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('info')
        .select('skills, user_id')
        .neq('user_id', userId);

      if (error) throw error;

      const skillsData = data.map(entry => `${entry.user_id}: ${entry.skills}`).join('\n');

      // This is what is given to the AI
      const context_for_ai = `You are a helpful assistant. The user will provide data containing user_id and skills pairs. Your task is to find the best match for the user's desired skill and explain why that match is appropriate. This is the data: ${skillsData}`

      // This is what the user sends to the AI
      const message_from_user = `My question about the data for myself is: ${message}`

      const api_link = process.env.REACT_APP_API_URL
      
      const res = await axios.post(api_link, {
        message_from_user,
        context_for_ai: `Answer the question using this context: ${context.current} and this history: ${history} where it shows what the user said and Talent Ed's response` ,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(res)
      const aiMessage = await res.data.response;
      console.log(aiMessage)
      setConversation((prev) => [
        ...prev,
        { role: "user", content: message_from_user },
        { role: "assistant", content: aiMessage },
      ]);

      setInputMessage('');
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; // Do not send empty messages

    await retrieveAllSkillsButUsers(inputMessage);
  };

  const handleViewProfile = () => {
    if (profileUserId) {
      window.open(`/profile/${profileUserId}`, '_blank');
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
          <button onClick={handleViewProfile} style={styles.button}>
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
  },
  profileTitle: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#31595B',
  },
};

export default Connect;
