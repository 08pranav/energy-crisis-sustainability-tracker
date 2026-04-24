import express from 'express';

const router = express.Router();

router.get('/disruptions', (req, res) => {
  res.json({ success: true, message: 'Supply disruptions endpoint scaffolded' });
});

router.get('/dependencies', (req, res) => {
  res.json({ success: true, message: 'Country dependency endpoint scaffolded' });
});

export default router;
