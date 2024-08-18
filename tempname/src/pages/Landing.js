import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  
  const handleShareLink = () => {
    navigate('/share');
  }

  const handleConnectLink = () => {
    navigate('/connect');
  }
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>What would you like to do?</h2>
      <div style={styles.customText1}>
        Fill out our form so other users can find your portfolio.
      </div>
      <div style={styles.customText2}>
        Talk to our custom AI assistant now to get in contact with other talented individuals. 
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button1} onClick={handleShareLink}>SHARE</button>
        <button style={styles.button2} onClick={handleConnectLink}>CONNECT</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '0rem',
    textAlign: 'center',
    padding: '2rem',
    backgroundImage: 'url("/landingback.png")', // Referencing the image from the public directory
    backgroundSize: 'cover', // Adjust to 'contain' if you want the image to fit within the container
    backgroundPosition: 'center', // Can be 'top', 'bottom', 'left', 'right', or 'center'
    backgroundRepeat: 'no-repeat', // Can be 'repeat', 'repeat-x', 'repeat-y', or 'no-repeat'
    minHeight: '100vh', // Ensures the background covers the entire viewport height
  },

  title: {
    fontSize: '3rem',
    marginBottom: '1.5rem',
    color: 'white', 
    fontWeight: 'bold',
  },
  customText1: {
    fontSize: '1.5rem',      // Adjust the font size as needed
    color: '#2A4A4C',      // Custom color
    position: 'absolute',  // Use absolute positioning
    top: '380px',           // Position it from the top
    left: '25%',         // Position it from the left
    padding: '1rem',       // Padding around the text
    borderRadius: '10px',  // Optional rounded corners
    maxWidth: '260px',     // Limit the width of the text block
    zIndex: 9999,               
  },
  customText2: {
    fontSize: '1.5rem',      // Adjust the font size as needed
    color: '#CFF3F0',      // Custom color
    position: 'absolute',  // Use absolute positioning
    top: '350px',           // Position it from the top
    left: '60%',         // Position it from the left
    padding: '1rem',       // Padding around the text
    borderRadius: '10px',  // Optional rounded corners
    maxWidth: '260px',     // Limit the width of the text block
    zIndex: 9999,               
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
  },
  button1: {
    padding: '1rem 2rem',
    fontSize: '3rem',
    fontWeight: 'bold',
    backgroundColor: '#CFF3F0',
    color: '#2A4A4C',
    borderRadius: '50px',
    textDecoration: 'none',
    cursor: 'pointer',
    width: '27rem',   // Custom width to match the image
    height: '35rem',  // Custom height to match the image
    position: 'absolute',  // Absolute positioning
    top: '150px',          // Distance from the top of the container
    left: '260px',         // Distance from the left of the container
    opacity: 0.9,          // Slight transparency
  
    // New properties to align the content
    display: 'flex',              // Use flexbox for alignment
    flexDirection: 'column',      // Stack items vertically
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',         // Center align content horizontally
    paddingTop: '5rem', 
  },
  
  button2: {
    padding: '1rem 2rem',
    fontSize: '3rem',
    fontWeight: 'bold',
    backgroundColor: '#2A4A4C',
    color: '#CFF3F0',
    borderRadius: '50px',
    textDecoration: 'none',
    cursor: 'pointer',
    width: '27rem',   // Custom width
    height: '35rem',   // Custom height
    position: 'absolute',  // Use 'absolute' or 'relative' depending on your layout needs
    top: '150px',          // Position from the top
    left: '770px',     
    opacity: 0.9,  

    display: 'flex',              // Use flexbox for alignment
    flexDirection: 'column',      // Stack items vertically
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',   
    paddingTop: '5rem', 
  },
};

export default Landing;
