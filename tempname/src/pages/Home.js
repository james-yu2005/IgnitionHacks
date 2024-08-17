import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <section style={styles.heroSection}>
        <h1 style={styles.title}>EXPLORE MORE</h1>
        <p style={styles.subtitle}>"Trade Old Skills for New Skills"</p>
        <Link to="/signup" style={styles.signUpButton}>Sign Up Now!</Link>
        <p style={styles.loginText}>
          or <Link to="/signin" style={styles.loginLink}>Log in here</Link>
        </p>
      </section>

      <section style={styles.whatWeDoSection}>
        <h2 style={styles.sectionTitle}>What We Do</h2>
        <p style={styles.introParagraph}>
          Talent Trade is a platform designed to connect people through the exchange of skills. Whether you're looking to learn something new, share your expertise, or rekindle an old hobby, we make finding the perfect match effortless. Here’s how it works:
        </p>
        <div style={styles.verticalStepsContainer}>
          <StepBox 
            title="Showcase Your Talent" 
            description="Create a portfolio highlighting your unique skills, whether it’s graphic design, coding, cooking, or any other talent you want to share." 
          />
          <StepBox 
            title="Engage with AI" 
            description="Our intelligent AI interface helps you find the right connections. Simply tell the AI what skill you want to learn or improve, and it will recommend users with relevant expertise. If you review their portfolio and like what you see, our AI will automatically send them an email with your connection request." 
          />
          <StepBox 
            title="Monitor Your Email" 
            description="Other users can find your profile through the AI chatbot and reach out to you. You can review their portfolio and decide if you would be willing to swap skills with them." 
          />
          <StepBox 
            title="Make a Connection" 
            description="Once you find someone whose skills match your needs, the AI facilitates the introduction by sharing your portfolio and contact information with them. If they’re interested in what you have to offer, you’re ready to swap skills!" 
          />
        </div>
        <p style={styles.outroParagraph}>
          At Talent Trade, we believe that learning is a collaborative journey. By connecting with others who have the skills you seek, you gain more than just knowledge—you gain valuable relationships and networking opportunities. Join us today and start trading talents with like-minded individuals in your community or across the globe.
        </p>
      </section>

      <section style={styles.differentSection}>
        <h2 style={styles.sectionTitle}>How Are We Different?</h2>
        <div style={styles.differentContainer}>
          <DifferentBox 
            title="AI-Driven Connections" 
            description="Our platform leverages advanced AI technology to create personalized connections. Instead of sifting through endless profiles, our AI curates matches based on your specific needs and interests, streamlining the process and saving you valuable time." 
          />
          <DifferentBox 
            title="Private" 
            description="Unlike other platforms, your portfolio isn’t posted publicly. It is securely stored and only shared with potential matches selected by our AI. This ensures that your information is seen only by people who are genuinely interested in connecting." 
          />
        </div>
        <div style={styles.differentContainer}>
          <DifferentBox 
            title="Tailored Educational Experiences" 
            description="Whether you’re seeking to develop a new skill or deepen your existing expertise, our AI learns from your preferences and goals to suggest the best partners for your learning journey, making the process more effective and enjoyable." 
          />
          <DifferentBox 
            title="Purposeful Connections" 
            description="We prioritize quality over quantity, fostering meaningful exchanges that benefit both parties. Our AI doesn’t just match you based on skills but also considers your commitment level by asking how many hours you’re willing to dedicate each week. This ensures that you’re paired with users who share your level of dedication, leading to more productive and balanced skill exchanges." 
          />
        </div>
      </section>

    </div>
  );
};

const StepBox = ({ title, description }) => (
  <div style={styles.stepBox}>
    <h3 style={styles.stepTitle}>{title}</h3>
    <p style={styles.stepDescription}>{description}</p>
  </div>
);

const DifferentBox = ({ title, description }) => (
  <div style={styles.differentBox}>
    <h3 style={styles.differentTitle}>{title}</h3>
    <p style={styles.differentDescription}>{description}</p>
  </div>
);

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    color: '#333',
    padding: '0', // Remove padding
    margin: '0', // Remove margin
    width: '100%', // Ensure full-width container
  },
  heroSection: {
    textAlign: 'center',
    padding: '100px 20px',
    backgroundImage: `url('/silhouettes.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    minHeight: '100vh',
    color: 'white',
    margin: '0', // Remove margin
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
  },
  signUpButton: {
    backgroundColor: '#000000',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'inline-block',
    cursor: 'pointer',
  },
  loginText: {
    marginTop: '20px',
    fontSize: '16px',
  },
  loginLink: {
    color: 'white',
    textDecoration: 'underline',
  },
  whatWeDoSection: {
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    width: '100%', // Ensure full-width
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  introParagraph: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    color: '#666',
    padding: '0 20px', // Add padding for smaller screens
  },
  verticalStepsContainer: {
    display: 'flex',
    flexDirection: 'column', // Stack the boxes vertically
    alignItems: 'center',
    marginBottom: '40px',
  },
  stepBox: {
    width: '80%', // Ensure the boxes take up 80% of the width
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '20px 0', // Add margin between boxes
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#0056b3',
  },
  stepDescription: {
    fontSize: '1rem',
    color: '#666',
  },
  outroParagraph: {
    fontSize: '1.2rem',
    marginTop: '20px',
    color: '#666',
    padding: '0 20px', // Add padding for smaller screens
  },
  differentSection: {
    backgroundColor: '#447e7b',
    padding: '60px 0', // Remove side padding
    textAlign: 'center',
    color: 'white',
    width: '100%', // Ensure full-width
  },
  differentContainer: {
    display: 'flex',
    justifyContent: 'space-between', // Use space between instead of center
    alignItems: 'flex-start',
    flexWrap: 'wrap', // Wrap boxes on smaller screens
  },
  differentBox: {
    flex: '1', // Allow different boxes to grow
    padding: '20px',
    margin: '10px', // Adjusted margin for better spacing
    backgroundColor: '#78b7b3',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    minWidth: '300px', // Ensure a minimum width for smaller screens
  },
  differentTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  differentDescription: {
    fontSize: '1rem',
  },
  footerSection: {
    backgroundColor: '#0056b3',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
  },
  footerTitle: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  footerText: {
    fontSize: '1rem',
  },
};

export default Home;
