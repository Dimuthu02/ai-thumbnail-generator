import axios from 'axios';

const API_URL = '/api/thumbnails';

// Get auth header
const getAuthHeader = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const token = JSON.parse(user).token;
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
  return {};
};

// Generate thumbnail
const generateThumbnail = async (prompt) => {
  const response = await axios.post(
    `${API_URL}/generate`,
    { prompt },
    getAuthHeader()
  );
  return response.data;
};

// Get all thumbnails
const getThumbnails = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

// Delete thumbnail
const deleteThumbnail = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

const thumbnailService = {
  generateThumbnail,
  getThumbnails,
  deleteThumbnail
};

export default thumbnailService;
