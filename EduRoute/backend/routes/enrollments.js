import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Enroll in a course
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { course_id } = req.body;

        // Check if course exists and is published
        const [courses] = await pool.query(
            'SELECT id FROM courses WHERE id = ? AND is_published = TRUE',
            [course_id]
        );

        if (courses.length === 0) {
            return res.status(404).json({ error: 'Course not found or not available' });
        }

        // Check if already enrolled
        const [existing] = await pool.query(
            'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
            [req.user.id, course_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Already enrolled in this course' });
        }

        // Enroll user
        await pool.query(
            'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
            [req.user.id, course_id]
        );

        res.status(201).json({ message: 'Enrolled successfully' });
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user's enrolled courses
router.get('/my-courses', authenticateToken, async (req, res) => {
    try {
        const [enrollments] = await pool.query(`
      SELECT 
        c.*,
        u.name as instructor_name,
        e.enrolled_at,
        e.last_lesson_id,
        COUNT(DISTINCT l.id) as total_lessons,
        COUNT(DISTINCT p.id) as completed_lessons
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      LEFT JOIN lessons l ON c.id = l.course_id
      LEFT JOIN progress p ON l.id = p.lesson_id AND p.user_id = e.user_id AND p.completed = TRUE
      WHERE e.user_id = ?
      GROUP BY c.id
      ORDER BY e.enrolled_at DESC
    `, [req.user.id]);

        res.json({ courses: enrollments });
    } catch (error) {
        console.error('Get enrolled courses error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get students enrolled in a course (instructor only)
router.get('/course/:courseId/students', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { courseId } = req.params;

        // Verify course belongs to instructor
        const [courses] = await pool.query(
            'SELECT id FROM courses WHERE id = ? AND instructor_id = ?',
            [courseId, req.user.id]
        );

        if (courses.length === 0) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const [students] = await pool.query(`
      SELECT 
        u.id,
        u.name,
        u.email,
        e.enrolled_at,
        COUNT(DISTINCT p.id) as completed_lessons,
        COUNT(DISTINCT l.id) as total_lessons
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      LEFT JOIN lessons l ON e.course_id = l.course_id
      LEFT JOIN progress p ON l.id = p.lesson_id AND p.user_id = u.id AND p.completed = TRUE
      WHERE e.course_id = ?
      GROUP BY u.id
      ORDER BY e.enrolled_at DESC
    `, [courseId]);

        res.json({ students });
    } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update last visited lesson
router.put('/course/:courseId/last-lesson', authenticateToken, async (req, res) => {
    try {
        const { courseId } = req.params;
        const { lesson_id } = req.body;

        await pool.query(
            'UPDATE enrollments SET last_lesson_id = ? WHERE user_id = ? AND course_id = ?',
            [lesson_id, req.user.id, courseId]
        );

        res.json({ message: 'Last lesson updated' });
    } catch (error) {
        console.error('Update last lesson error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
