import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/export.csv', authenticate, (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.send('country,commodity,price,recordedAt\n');
});

router.get('/export.pdf', authenticate, (req, res) => {
  res.json({ success: true, message: 'PDF export endpoint scaffolded' });
});

export default router;
