import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/upload', authenticate, authorize('admin'), (req, res) => {
  res.status(201).json({ success: true, message: 'Dataset upload endpoint scaffolded' });
});

router.post('/ingest/iea', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'IEA ingestion trigger scaffolded' });
});

router.post('/ingest/bp', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'BP ingestion trigger scaffolded' });
});

router.get('/ingestion-jobs', authenticate, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Ingestion jobs endpoint scaffolded' });
});

export default router;
