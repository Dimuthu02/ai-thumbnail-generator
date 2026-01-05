import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>AI-Powered Thumbnail Generator</h1>
        <p style={styles.description}>
          Create stunning thumbnails from text prompts using advanced AI technology.
          Perfect for YouTube videos, blog posts, social media, and more.
        </p>
        <div style={styles.buttons}>
          <Link to="/register" style={styles.primaryButton}>
            Get Started
          </Link>
          <Link to="/login" style={styles.secondaryButton}>
            Login
          </Link>
        </div>
      </div>
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>🎨 AI-Powered</h3>
          <p>Generate unique thumbnails using state-of-the-art AI models</p>
        </div>
        <div style={styles.feature}>
          <h3>⚡ Fast & Easy</h3>
          <p>Create professional thumbnails in seconds with simple text prompts</p>
        </div>
        <div style={styles.feature}>
          <h3>📱 Cloud Storage</h3>
          <p>Save and manage all your thumbnails in one place</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  hero: {
    textAlign: 'center',
    padding: '3rem 0'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#333'
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
    maxWidth: '800px',
    margin: '0 auto 2rem'
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  },
  primaryButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '1.1rem'
  },
  secondaryButton: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '1.1rem'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '4rem'
  },
  feature: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  }
};

export default Home;
