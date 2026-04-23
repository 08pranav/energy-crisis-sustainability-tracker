import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:iso3/:commodity', authenticate, (req, res) => {
  const { iso3, commodity } = req.params;
  res.json({ success: true, message: `Forecast endpoint scaffolded for ${iso3}/${commodity}` });
});

export default router;
