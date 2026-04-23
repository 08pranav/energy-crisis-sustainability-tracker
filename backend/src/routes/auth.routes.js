import express from 'express';
import { validate } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validator.js';

const router = express.Router();

// Person 1 owns this route file and controller implementation.
router.post('/register', validate(registerSchema), (req, res) => {
  res.status(201).json({ success: true, message: 'Register endpoint scaffolded', data: req.body });
});

router.post('/login', validate(loginSchema), (req, res) => {
  res.json({ success: true, message: 'Login endpoint scaffolded' });
});

router.post('/refresh', (req, res) => {
  res.json({ success: true, message: 'Refresh endpoint scaffolded' });
});

router.post('/logout', authenticate, (req, res) => {
  res.json({ success: true, message: 'Logout endpoint scaffolded' });
});

router.get('/me', authenticate, (req, res) => {
  res.json({ success: true, message: 'Current user endpoint scaffolded', data: req.user });
});

export default router;
