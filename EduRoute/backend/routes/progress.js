import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's progress for a course
router.get('/course/:courseId', authenticateToken, async (req, res) => {
    try {
        const { courseId } = req.params;

        const [progress] = await pool.query(`
      SELECT 
        l.id as lesson_id,
        l.title,
        l.order_index,
        COALESCE(p.completed, FALSE) as completed,
        p.completed_at
      FROM lessons l
      LEFT JOIN progress p ON l.id = p.lesson_id AND p.user_id = ?
      WHERE l.course_id = ?
      ORDER BY l.order_index ASC
    `, [req.user.id, courseId]);

        const totalLessons = progress.length;
        const completedLessons = progress.filter(p => p.completed).length;
        const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        res.json({
            progress,
            stats: {
                total: totalLessons,
                completed: completedLessons,
                percentage: progressPercentage
            }
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Mark lesson as complete
router.post('/lesson/:lessonId/complete', authenticateToken, async (req, res) => {
    try {
        const { lessonId } = req.params;

        // Check if user is enrolled
        const [lessons] = await pool.query('SELECT course_id FROM lessons WHERE id = ?', [lessonId]);

        if (lessons.length === 0) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        const [enrollment] = await pool.query(
            'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
            [req.user.id, lessons[0].course_id]
        );

        if (enrollment.length === 0) {
            return res.status(403).json({ error: 'Not enrolled in this course' });
        }

        // Mark as complete (upsert)
        await pool.query(`
      INSERT INTO progress (user_id, lesson_id, completed, completed_at)
      VALUES (?, ?, TRUE, NOW())
      ON DUPLICATE KEY UPDATE completed = TRUE, completed_at = NOW()
    `, [req.user.id, lessonId]);

        res.json({ message: 'Lesson marked as complete' });
    } catch (error) {
        console.error('Mark complete error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get next lesson to study
router.get('/course/:courseId/next-lesson', authenticateToken, async (req, res) => {
    try {
        const { courseId } = req.params;

        // Get first incomplete lesson
        const [lessons] = await pool.query(`
      SELECT l.*
      FROM lessons l
      LEFT JOIN progress p ON l.id = p.lesson_id AND p.user_id = ?
      WHERE l.course_id = ? AND (p.completed IS NULL OR p.completed = FALSE)
      ORDER BY l.order_index ASC
      LIMIT 1
    `, [req.user.id, courseId]);

        if (lessons.length === 0) {
            return res.json({ message: 'All lessons completed', next_lesson: null });
        }

        res.json({ next_lesson: lessons[0] });
    } catch (error) {
        console.error('Get next lesson error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
