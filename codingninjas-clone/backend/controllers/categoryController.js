import { getDatabase } from '../config/database.js';
import { successResponse } from '../utils/helpers.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
    const db = getDatabase();

    const categories = db.prepare(`
    SELECT c.*, COUNT(co.id) as course_count
    FROM categories c
    LEFT JOIN courses co ON c.id = co.category_id AND co.status = 'active'
    GROUP BY c.id
    ORDER BY c.name
  `).all();

    res.json(successResponse(categories));
});

/**
 * @desc    Create category
 * @route   POST /api/categories
 * @access  Private (Admin)
 */
export const createCategory = asyncHandler(async (req, res) => {
    const { name, description, icon } = req.body;
    const db = getDatabase();

    const result = db.prepare(`
    INSERT INTO categories (name, description, icon)
    VALUES (?, ?, ?)
  `).run(name, description, icon || null);

    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(successResponse(category, 'Category created successfully'));
});
