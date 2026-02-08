import { getDatabase } from '../config/database.js';
import { successResponse } from '../utils/helpers.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Submit lead from hero form
 * @route   POST /api/leads
 * @access  Public
 */
export const submitLead = asyncHandler(async (req, res) => {
    const { name, email, phone, experience, interest } = req.body;
    const db = getDatabase();

    const result = db.prepare(`
    INSERT INTO leads (name, email, phone, experience, interest)
    VALUES (?, ?, ?, ?, ?)
  `).run(name, email, phone, experience || null, interest || null);

    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(successResponse(lead, 'Thank you! We will contact you soon.'));
});

/**
 * @desc    Get all leads (Admin)
 * @route   GET /api/leads
 * @access  Private (Admin)
 */
export const getLeads = asyncHandler(async (req, res) => {
    const db = getDatabase();

    const leads = db.prepare(`
    SELECT * FROM leads
    ORDER BY created_at DESC
  `).all();

    res.json(successResponse(leads));
});
