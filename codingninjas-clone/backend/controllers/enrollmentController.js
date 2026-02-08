import { getDatabase } from '../config/database.js';
import { successResponse } from '../utils/helpers.js';
import { NotFoundError, ConflictError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Enroll in a course
 * @route   POST /api/enrollments
 * @access  Private
 */
export const enrollCourse = asyncHandler(async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;
    const db = getDatabase();

    // Check if course exists
    const course = db.prepare('SELECT * FROM courses WHERE id = ? AND status = ?').get(course_id, 'active');
    if (!course) {
        throw new NotFoundError('Course not found or inactive');
    }

    // Check if already enrolled
    const existingEnrollment = db.prepare('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?').get(userId, course_id);
    if (existingEnrollment) {
        throw new ConflictError('Already enrolled in this course');
    }

    // Create enrollment
    const result = db.prepare(`
    INSERT INTO enrollments (user_id, course_id, status, progress_percentage)
    VALUES (?, ?, ?, ?)
  `).run(userId, course_id, 'active', 0);

    // Update course enrollment count
    db.prepare('UPDATE courses SET enrollment_count = enrollment_count + 1 WHERE id = ?').run(course_id);

    const enrollment = db.prepare(`
    SELECT e.*, c.title as course_title, c.description, c.price, c.image_url, c.level
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.id = ?
  `).get(result.lastInsertRowid);

    res.status(201).json(successResponse(enrollment, 'Successfully enrolled in course'));
});

/**
 * @desc    Get user's enrolled courses
 * @route   GET /api/enrollments/my-courses
 * @access  Private
 */
export const getMyCourses = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const db = getDatabase();

    const enrollments = db.prepare(`
    SELECT e.*, c.title as course_title, c.description, c.price, c.image_url, c.level, c.duration,
           cat.name as category_name, u.name as instructor_name
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    LEFT JOIN categories cat ON c.category_id = cat.id
    LEFT JOIN instructors i ON c.instructor_id = i.id
    LEFT JOIN users u ON i.user_id = u.id
    WHERE e.user_id = ?
    ORDER BY e.enrolled_at DESC
  `).all(userId);

    res.json(successResponse(enrollments));
});

/**
 * @desc    Update course progress
 * @route   PUT /api/enrollments/:id/progress
 * @access  Private
 */
export const updateProgress = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { progress_percentage } = req.body;
    const userId = req.user.id;
    const db = getDatabase();

    const enrollment = db.prepare('SELECT * FROM enrollments WHERE id = ? AND user_id = ?').get(id, userId);
    if (!enrollment) {
        throw new NotFoundError('Enrollment not found');
    }

    const newProgress = Math.min(100, Math.max(0, progress_percentage));
    const status = newProgress === 100 ? 'completed' : 'active';
    const completedAt = newProgress === 100 ? new Date().toISOString() : null;

    db.prepare(`
    UPDATE enrollments
    SET progress_percentage = ?, status = ?, completed_at = ?
    WHERE id = ?
  `).run(newProgress, status, completedAt, id);

    const updatedEnrollment = db.prepare('SELECT * FROM enrollments WHERE id = ?').get(id);

    res.json(successResponse(updatedEnrollment, 'Progress updated successfully'));
});

/**
 * @desc    Check enrollment status
 * @route   GET /api/enrollments/check/:courseId
 * @access  Private
 */
export const checkEnrollment = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;
    const db = getDatabase();

    const enrollment = db.prepare('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?').get(userId, courseId);

    res.json(successResponse({
        isEnrolled: !!enrollment,
        enrollment: enrollment || null
    }));
});
