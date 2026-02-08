import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, authorizeRole, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all published courses (public)
router.get('/', optionalAuth, async (req, res) => {
    try {
        const [courses] = await pool.query(`
      SELECT 
        c.*,
        u.name as instructor_name,
        COUNT(DISTINCT l.id) as lesson_count,
        COUNT(DISTINCT e.id) as student_count
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN lessons l ON c.id = l.course_id
      LEFT JOIN enrollments e ON c.id = e.course_id
      WHERE c.is_published = TRUE
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);

        res.json({ courses });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get instructor's courses (MUST be before /:id route)
router.get('/instructor/my-courses', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const [courses] = await pool.query(`
      SELECT 
        c.*,
        COUNT(DISTINCT l.id) as lesson_count,
        COUNT(DISTINCT e.id) as student_count
      FROM courses c
      LEFT JOIN lessons l ON c.id = l.course_id
      LEFT JOIN enrollments e ON c.id = e.course_id
      WHERE c.instructor_id = ?
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `, [req.user.id]);

        res.json({ courses });
    } catch (error) {
        console.error('Get instructor courses error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single course details
router.get('/:id', optionalAuth, async (req, res) => {
    try {
        const { id } = req.params;

        const [courses] = await pool.query(`
      SELECT 
        c.*,
        u.name as instructor_name,
        u.email as instructor_email
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.id = ? AND c.is_published = TRUE
    `, [id]);

        if (courses.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const course = courses[0];

        // Get lesson count
        const [lessonCount] = await pool.query(
            'SELECT COUNT(*) as count FROM lessons WHERE course_id = ?',
            [id]
        );

        course.lesson_count = lessonCount[0].count;

        // Check if user is enrolled (if authenticated)
        if (req.user) {
            const [enrollment] = await pool.query(
                'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
                [req.user.id, id]
            );
            course.is_enrolled = enrollment.length > 0;
        }

        res.json({ course });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create new course (instructor only)
router.post('/', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { title, description, thumbnail } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO courses (title, description, instructor_id, thumbnail) VALUES (?, ?, ?, ?)',
            [title, description, req.user.id, thumbnail]
        );

        res.status(201).json({
            message: 'Course created successfully',
            course: {
                id: result.insertId,
                title,
                description,
                instructor_id: req.user.id,
                thumbnail
            }
        });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update course (instructor only - own courses)
router.put('/:id', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, thumbnail, is_published } = req.body;

        // Check if course belongs to instructor
        const [courses] = await pool.query(
            'SELECT * FROM courses WHERE id = ? AND instructor_id = ?',
            [id, req.user.id]
        );

        if (courses.length === 0) {
            return res.status(404).json({ error: 'Course not found or access denied' });
        }

        await pool.query(
            'UPDATE courses SET title = ?, description = ?, thumbnail = ?, is_published = ? WHERE id = ?',
            [title, description, thumbnail, is_published, id]
        );

        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete course (instructor only - own courses)
router.delete('/:id', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { id } = req.params;

        // Check if course belongs to instructor
        const [courses] = await pool.query(
            'SELECT * FROM courses WHERE id = ? AND instructor_id = ?',
            [id, req.user.id]
        );

        if (courses.length === 0) {
            return res.status(404).json({ error: 'Course not found or access denied' });
        }

        await pool.query('DELETE FROM courses WHERE id = ?', [id]);

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
