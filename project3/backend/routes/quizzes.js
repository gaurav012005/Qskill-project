import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Get quiz for a course
router.get('/course/:courseId', authenticateToken, async (req, res) => {
    try {
        const { courseId } = req.params;

        const [quizzes] = await pool.query(
            'SELECT * FROM quizzes WHERE course_id = ?',
            [courseId]
        );

        if (quizzes.length === 0) {
            return res.status(404).json({ error: 'No quiz found for this course' });
        }

        const quiz = quizzes[0];

        // Get questions
        const [questions] = await pool.query(
            'SELECT id, question, options, points FROM quiz_questions WHERE quiz_id = ?',
            [quiz.id]
        );

        // Check if user has already taken the quiz
        const [results] = await pool.query(
            'SELECT * FROM quiz_results WHERE user_id = ? AND quiz_id = ?',
            [req.user.id, quiz.id]
        );

        res.json({
            quiz: {
                ...quiz,
                questions
            },
            has_taken: results.length > 0,
            result: results.length > 0 ? results[0] : null
        });
    } catch (error) {
        console.error('Get quiz error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Submit quiz
router.post('/:quizId/submit', authenticateToken, async (req, res) => {
    try {
        const { quizId } = req.params;
        const { answers } = req.body; // { questionId: answerIndex }

        // Get quiz and questions
        const [quizzes] = await pool.query('SELECT * FROM quizzes WHERE id = ?', [quizId]);

        if (quizzes.length === 0) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const quiz = quizzes[0];

        const [questions] = await pool.query(
            'SELECT * FROM quiz_questions WHERE quiz_id = ?',
            [quizId]
        );

        // Calculate score
        let score = 0;
        let totalPoints = 0;

        questions.forEach(q => {
            totalPoints += q.points;
            if (answers[q.id] === q.correct_answer) {
                score += q.points;
            }
        });

        const percentage = Math.round((score / totalPoints) * 100);
        const passed = percentage >= quiz.passing_score;

        // Save result
        await pool.query(
            'INSERT INTO quiz_results (user_id, quiz_id, score, total_points, passed) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, quizId, score, totalPoints, passed]
        );

        res.json({
            score,
            total_points: totalPoints,
            percentage,
            passed,
            passing_score: quiz.passing_score
        });
    } catch (error) {
        console.error('Submit quiz error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create quiz (instructor only)
router.post('/', authenticateToken, authorizeRole('instructor'), async (req, res) => {
    try {
        const { course_id, title, passing_score, questions } = req.body;

        // Verify course belongs to instructor
        const [courses] = await pool.query(
            'SELECT id FROM courses WHERE id = ? AND instructor_id = ?',
            [course_id, req.user.id]
        );

        if (courses.length === 0) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Create quiz
        const [result] = await pool.query(
            'INSERT INTO quizzes (course_id, title, passing_score) VALUES (?, ?, ?)',
            [course_id, title, passing_score || 70]
        );

        const quizId = result.insertId;

        // Add questions
        if (questions && questions.length > 0) {
            for (const q of questions) {
                await pool.query(
                    'INSERT INTO quiz_questions (quiz_id, question, options, correct_answer, points) VALUES (?, ?, ?, ?, ?)',
                    [quizId, q.question, JSON.stringify(q.options), q.correct_answer, q.points || 1]
                );
            }
        }

        res.status(201).json({ message: 'Quiz created successfully', quiz_id: quizId });
    } catch (error) {
        console.error('Create quiz error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
