import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.json({ success: true, message: 'Active alerts endpoint scaffolded' });
});

router.post('/rules', authenticate, authorize('admin'), (req, res) => {
  res.status(201).json({ success: true, message: 'Create alert rule endpoint scaffolded' });
});

router.patch('/rules/:id', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: `Update alert rule ${req.params.id} endpoint scaffolded` });
});

router.delete('/rules/:id', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: `Delete alert rule ${req.params.id} endpoint scaffolded` });
});

export default router;
