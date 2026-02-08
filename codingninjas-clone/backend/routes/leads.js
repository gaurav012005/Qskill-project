import express from 'express';
import { submitLead, getLeads } from '../controllers/leadController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitLead);
router.get('/', protect, authorize('admin'), getLeads);

export default router;
