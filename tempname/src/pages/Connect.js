import React, { useState } from 'react';
import { supabase } from "../supabase/supabase";
import OpenAI from "openai";

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

      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. The user will provide data containing user_id and skills pairs. Your task is to find the best match for the user's desired skill and explain why that match is appropriate.",
          },
          {
            role: "user",
            content: `This is the data: ${skillsData}. ${message}`,
          },
        ],
        max_tokens: 500, 
      });

      const aiMessage = completion.choices[0].message.content;

      setConversation((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: aiMessage },
      ]);

      setInputMessage(''); // Clear the input field after sending the message
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>CONNECT</h2>
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
    color: '#31595B',
    fontWeight: 'bold',
  },
  chatBox: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxHeight: '300px',
    overflowY: 'auto',
    color: '#000', // Set the text color to black
  },
  userMessage: {
    textAlign: 'right',
    backgroundColor: '#e0e0e0',
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0',
    color: '#000', // Set the text color to black
  },
  aiMessage: {
    textAlign: 'left',
    backgroundColor: '#cce5ff',
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0',
    color: '#000', // Set the text color to black
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
    color: '#000', // Set the text color to black
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
};

export default Connect;
