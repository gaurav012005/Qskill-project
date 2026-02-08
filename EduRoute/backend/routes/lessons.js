import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Get all lessons for a course
router.get('/course/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;

        const [lessons] = await pool.query(
            'SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index ASC',
            [courseId]
        );

        res.json({ lessons });
    } catch (error) {
        console.error('Get lessons error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single lesson
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const [lessons] = await pool.query('SELECT * FROM lessons WHERE id = ?', [id]);

        if (lessons.length === 0) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        const lesson = lessons[0];

        // Check if user is enrolled in the course
        const [enrollment] = await pool.query(
            'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
            [req.user.id, lesson.course_id]
        );

        if (enrollment.length === 0 && req.user.role !== 'instructor') {
            return res.status(403).json({ error: 'Not enrolled in this course' });
        }

        res.json({ lesson });
    } catch (error) {
        console.error('Get lesson error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create lesson (instructor only)
router.post('/', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { course_id, title, content, video_url, order_index, duration } = req.body;

        // Verify course belongs to instructor
        const [courses] = await pool.query(
            'SELECT id FROM courses WHERE id = ? AND instructor_id = ?',
            [course_id, req.user.id]
        );

        if (courses.length === 0) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const [result] = await pool.query(
            'INSERT INTO lessons (course_id, title, content, video_url, order_index, duration) VALUES (?, ?, ?, ?, ?, ?)',
            [course_id, title, content, video_url, order_index, duration]
        );

        res.status(201).json({
            message: 'Lesson created successfully',
            lesson: { id: result.insertId, course_id, title, content, video_url, order_index, duration }
        });
    } catch (error) {
        console.error('Create lesson error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update lesson (instructor only)
router.put('/:id', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, video_url, order_index, duration } = req.body;

        // Verify lesson belongs to instructor's course
        const [lessons] = await pool.query(`
      SELECT l.* FROM lessons l
      JOIN courses c ON l.course_id = c.id
      WHERE l.id = ? AND c.instructor_id = ?
    `, [id, req.user.id]);

        if (lessons.length === 0) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await pool.query(
            'UPDATE lessons SET title = ?, content = ?, video_url = ?, order_index = ?, duration = ? WHERE id = ?',
            [title, content, video_url, order_index, duration, id]
        );

        res.json({ message: 'Lesson updated successfully' });
    } catch (error) {
        console.error('Update lesson error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete lesson (instructor only)
router.delete('/:id', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { id } = req.params;

        // Verify lesson belongs to instructor's course
        const [lessons] = await pool.query(`
      SELECT l.* FROM lessons l
      JOIN courses c ON l.course_id = c.id
      WHERE l.id = ? AND c.instructor_id = ?
    `, [id, req.user.id]);

        if (lessons.length === 0) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await pool.query('DELETE FROM lessons WHERE id = ?', [id]);

        res.json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        console.error('Delete lesson error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
