import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Energy prices list endpoint scaffolded' });
});

router.get('/latest', authenticate, (req, res) => {
  res.json({ success: true, message: 'Latest energy prices endpoint scaffolded' });
});

router.get('/:iso3/trend', authenticate, (req, res) => {
  res.json({ success: true, message: `Trend endpoint scaffolded for ${req.params.iso3}` });
});

router.get('/live', authenticate, (req, res) => {
  res.json({ success: true, message: 'Polling endpoint scaffolded' });
});

export default router;
