import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <section style={styles.heroSection}>
        <h1 style={styles.title}>EXPLORE MORE</h1>
        <p style={styles.subtitle}>"Revolutionizing the knowledge economy"</p>
        <Link to="/signup" style={styles.signUpButton}>Sign Up Now!</Link>
        <p style={styles.loginText}>
          or <Link to="/signin" style={styles.loginLink}>Log in here</Link>
        </p>
      </section>

      <section style={styles.whatWeDoSection}>
        <h2 style={styles.sectionTitle}>What We Do</h2>
        <p style={styles.introParagraph}>
          TalentTrade is a platform that connects people through the exchange of skills. Whether you're looking to learn something new, share your expertise, or get back into an old hobby, we make finding the perfect match painless.
        </p>
        <div style={styles.stepsContainer}>
          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle}>Step 1: Showcase Your Talent</h3>
            <p style={styles.stepDescription}>
              Create a profile highlighting your unique skills, share your knowledge, and connect with others.
            </p>
          </div>
          <div style={styles.arrow}>→</div>
          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle}>Step 2: Engage with AI</h3>
            <p style={styles.stepDescription}>
              Our AI-powered system will help you find the best matches for skill exchange and collaboration.
            </p>
          </div>
        </div>
        <div style={styles.stepsContainer}>
          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle}>Step 3: Monitor your email</h3>
            <p style={styles.stepDescription}>
              Check your email for your progress through the AI system. If there are any updates, we'll let you know!
            </p>
          </div>
          <div style={styles.arrow}>→</div>
          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle}>Step 4: Make a Connection</h3>
            <p style={styles.stepDescription}>
              Once you find a match that suits your needs, connect and start learning or teaching.
            </p>
          </div>
        </div>
        <p style={styles.outroParagraph}>
          At TalentTrade, we believe that learning is a collaborative journey. By connecting with others who have the skills you seek, you can more fully engage in your own journey of personal and professional growth. Join today and start trading your well-intentioned individuals right in your community—or across the globe.
        </p>
      </section>

      <section style={styles.differentSection}>
        <h2 style={styles.sectionTitle}>How Are We Different?</h2>
        <div style={styles.differentContainer}>
          <div style={styles.differentBox}>
            <h3 style={styles.differentTitle}>AI-Driven Connections</h3>
            <p style={styles.differentDescription}>
              Our AI system analyzes your skills and preferences to make the best possible match.
            </p>
          </div>
          <div style={styles.differentBox}>
            <h3 style={styles.differentTitle}>Tailored Educational Experiences</h3>
            <p style={styles.differentDescription}>
              Whether you're just starting out or looking to hone your skills, our platform tailors learning experiences to your needs.
            </p>
          </div>
        </div>
        <div style={styles.differentContainer}>
          <div style={styles.differentBox}>
            <h3 style={styles.differentTitle}>Purposeful Connections</h3>
            <p style={styles.differentDescription}>
              Connect with people who are passionate about what they do and eager to share their knowledge.
            </p>
          </div>
          <div style={styles.differentBox}>
            <h3 style={styles.differentTitle}>Private and Secure</h3>
            <p style={styles.differentDescription}>
              Unlike other platforms, we prioritize your privacy and ensure that your information is kept secure.
            </p>
          </div>
        </div>
      </section>

      <footer style={styles.footerSection}>
        <h2 style={styles.footerTitle}>Contact Us</h2>
        <p style={styles.footerText}>Phone: (647) 685 - 5940</p>
        <p style={styles.footerText}>Email: talent.trade@gmail.com</p>
        <p style={styles.footerText}>Address: 123 Main St, Toronto</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Akaya Telivigala', cursive",
    color: '#333',
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
    backgroundColor: '#0056b3',
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
    backgroundColor: '#fff',
    padding: '60px 20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  introParagraph: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    color: '#666',
  },
  stepsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  stepBox: {
    width: '250px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    margin: '0 10px',
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
  arrow: {
    fontSize: '2rem',
    color: '#0056b3',
  },
  outroParagraph: {
    fontSize: '1.2rem',
    marginTop: '20px',
    color: '#666',
  },
  differentSection: {
    backgroundColor: '#447e7b',
    padding: '60px 20px',
    textAlign: 'center',
    color: 'white',
  },
  differentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  differentBox: {
    width: '300px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#78b7b3',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
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
