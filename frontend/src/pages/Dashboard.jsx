import { useState, useEffect } from 'react';
import thumbnailService from '../services/thumbnailService';

const Dashboard = () => {
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const fetchThumbnails = async () => {
    try {
      const data = await thumbnailService.getThumbnails();
      setThumbnails(data);
    } catch (err) {
      setError('Failed to load thumbnails');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this thumbnail?')) {
      try {
        await thumbnailService.deleteThumbnail(id);
        setThumbnails(thumbnails.filter(t => t._id !== id));
      } catch (err) {
        setError('Failed to delete thumbnail');
      }
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Thumbnails</h2>
      {error && <div style={styles.error}>{error}</div>}
      {thumbnails.length === 0 ? (
        <div style={styles.empty}>
          <p>No thumbnails yet. Generate your first one!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {thumbnails.map((thumbnail) => (
            <div key={thumbnail._id} style={styles.card}>
              <img 
                src={thumbnail.imageUrl} 
                alt={thumbnail.prompt} 
                style={styles.image}
              />
              <div style={styles.cardContent}>
                <p style={styles.prompt}>{thumbnail.prompt}</p>
                <p style={styles.date}>
                  {new Date(thumbnail.createdAt).toLocaleDateString()}
                </p>
                <div style={styles.actions}>
                  <a 
                    href={thumbnail.imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.viewButton}
                  >
                    View Full Size
                  </a>
                  <button 
                    onClick={() => handleDelete(thumbnail._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '2rem'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontSize: '1.5rem'
  },
  error: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    color: '#666'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardContent: {
    padding: '1rem'
  },
  prompt: {
    color: '#333',
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  },
  date: {
    color: '#999',
    fontSize: '0.8rem',
    marginBottom: '1rem'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
};

export default Dashboard;
