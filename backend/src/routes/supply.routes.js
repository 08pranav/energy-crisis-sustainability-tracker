import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/disruptions', authenticate, (req, res) => {
  res.json({ success: true, message: 'Supply disruptions endpoint scaffolded' });
});

router.get('/dependencies', authenticate, (req, res) => {
  res.json({ success: true, message: 'Country dependency endpoint scaffolded' });
});

export default router;
