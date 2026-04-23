import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/compare', authenticate, (req, res) => {
  res.json({ success: true, message: 'Renewables vs fossil comparison endpoint scaffolded' });
});

export default router;
