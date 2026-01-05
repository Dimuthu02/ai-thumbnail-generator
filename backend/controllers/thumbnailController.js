import axios from 'axios';
import Thumbnail from '../models/Thumbnail.js';

// @desc    Generate thumbnail using AI
// @route   POST /api/thumbnails/generate
// @access  Private
const generateThumbnail = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Please provide a prompt' });
    }

    // Call OpenAI DALL-E API
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrl = response.data.data[0].url;

    // Save thumbnail to database
    const thumbnail = await Thumbnail.create({
      user: req.user._id,
      prompt,
      imageUrl
    });

    res.status(201).json(thumbnail);
  } catch (error) {
    console.error('Error generating thumbnail:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to generate thumbnail',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

// @desc    Get user's thumbnails
// @route   GET /api/thumbnails
// @access  Private
const getThumbnails = async (req, res) => {
  try {
    const thumbnails = await Thumbnail.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(thumbnails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single thumbnail
// @route   GET /api/thumbnails/:id
// @access  Private
const getThumbnail = async (req, res) => {
  try {
    const thumbnail = await Thumbnail.findById(req.params.id);

    if (!thumbnail) {
      return res.status(404).json({ message: 'Thumbnail not found' });
    }

    // Check if thumbnail belongs to user
    if (thumbnail.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(thumbnail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete thumbnail
// @route   DELETE /api/thumbnails/:id
// @access  Private
const deleteThumbnail = async (req, res) => {
  try {
    const thumbnail = await Thumbnail.findById(req.params.id);

    if (!thumbnail) {
      return res.status(404).json({ message: 'Thumbnail not found' });
    }

    // Check if thumbnail belongs to user
    if (thumbnail.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await thumbnail.deleteOne();

    res.json({ message: 'Thumbnail removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { generateThumbnail, getThumbnails, getThumbnail, deleteThumbnail };
