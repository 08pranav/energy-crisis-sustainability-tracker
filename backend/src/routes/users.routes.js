import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { updateUserSchema } from '../validators/user.validator.js';

const router = express.Router();

// Admin-only user management endpoints.
router.get('/', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'List users endpoint scaffolded' });
});

router.get('/:id', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: `Get user ${req.params.id} endpoint scaffolded` });
});

router.patch('/:id', authenticate, authorize('admin'), validate(updateUserSchema), (req, res) => {
  res.json({ success: true, message: `Update user ${req.params.id} endpoint scaffolded`, data: req.body });
});

router.delete('/:id', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: `Delete user ${req.params.id} endpoint scaffolded` });
});

export default router;
