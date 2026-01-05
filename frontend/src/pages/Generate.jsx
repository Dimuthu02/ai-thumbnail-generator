import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import thumbnailService from '../services/thumbnailService';

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await thumbnailService.generateThumbnail(prompt);
      setSuccess('Thumbnail generated successfully!');
      setPrompt('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate thumbnail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Generate AI Thumbnail</h2>
        <p style={styles.description}>
          Enter a detailed description of the thumbnail you want to create. 
          Be specific about colors, style, elements, and mood.
        </p>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              placeholder="e.g., A vibrant YouTube thumbnail with bold text 'AMAZING' in red and yellow, featuring a shocked face expression on a colorful gradient background"
              rows="6"
              style={styles.textarea}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Generating...' : 'Generate Thumbnail'}
          </button>
        </form>
        <div style={styles.tips}>
          <h3 style={styles.tipsTitle}>Tips for better results:</h3>
          <ul style={styles.tipsList}>
            <li>Be specific about colors and style</li>
            <li>Mention text and its style if needed</li>
            <li>Describe the mood and emotions</li>
            <li>Include specific elements you want</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem'
  },
  content: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#333'
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: 'bold',
    color: '#555'
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  error: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  success: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  tips: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  tipsTitle: {
    color: '#333',
    marginBottom: '0.5rem'
  },
  tipsList: {
    color: '#666',
    paddingLeft: '1.5rem'
  }
};

export default Generate;
