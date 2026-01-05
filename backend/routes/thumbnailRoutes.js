import express from 'express';
import {
  generateThumbnail,
  getThumbnails,
  getThumbnail,
  deleteThumbnail
} from '../controllers/thumbnailController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', protect, generateThumbnail);
router.get('/', protect, getThumbnails);
router.get('/:id', protect, getThumbnail);
router.delete('/:id', protect, deleteThumbnail);

export default router;
