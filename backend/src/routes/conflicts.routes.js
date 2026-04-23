import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Conflict events list endpoint scaffolded' });
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: `Conflict event ${req.params.id} endpoint scaffolded` });
});

export default router;
