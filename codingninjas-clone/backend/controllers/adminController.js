import { getDatabase } from '../config/database.js';
import { successResponse, paginate } from '../utils/helpers.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all users (Admin)
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 */
export const getAllUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const db = getDatabase();

    const { limit: limitNum, offset } = paginate(parseInt(page), parseInt(limit));

    const users = db.prepare(`
    SELECT id, email, name, phone, role, created_at
    FROM users
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).all(limitNum, offset);

    const { total } = db.prepare('SELECT COUNT(*) as total FROM users').get();

    res.json(successResponse({
        users,
        pagination: {
            page: parseInt(page),
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
        }
    }));
});

/**
 * @desc    Get platform statistics
 * @route   GET /api/admin/stats
 * @access  Private (Admin)
 */
export const getPlatformStats = asyncHandler(async (req, res) => {
    const db = getDatabase();

    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const totalCourses = db.prepare('SELECT COUNT(*) as count FROM courses WHERE status = ?').get('active').count;
    const totalEnrollments = db.prepare('SELECT COUNT(*) as count FROM enrollments').get().count;
    const totalRevenue = db.prepare('SELECT SUM(amount) as total FROM payments WHERE status = ?').get('completed').total || 0;

    const recentEnrollments = db.prepare(`
    SELECT e.*, u.name as user_name, c.title as course_title
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN courses c ON e.course_id = c.id
    ORDER BY e.enrolled_at DESC
    LIMIT 10
  `).all();

    const topCourses = db.prepare(`
    SELECT c.*, COUNT(e.id) as enrollment_count
    FROM courses c
    LEFT JOIN enrollments e ON c.id = e.course_id
    WHERE c.status = 'active'
    GROUP BY c.id
    ORDER BY enrollment_count DESC
    LIMIT 5
  `).all();

    res.json(successResponse({
        stats: {
            totalUsers,
            totalCourses,
            totalEnrollments,
            totalRevenue
        },
        recentEnrollments,
        topCourses
    }));
});

/**
 * @desc    Update user role
 * @route   PUT /api/admin/users/:id/role
 * @access  Private (Admin)
 */
export const updateUserRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const db = getDatabase();

    db.prepare('UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(role, id);

    const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(id);

    res.json(successResponse(user, 'User role updated successfully'));
});

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private (Admin)
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const db = getDatabase();

    db.prepare('DELETE FROM users WHERE id = ?').run(id);

    res.json(successResponse(null, 'User deleted successfully'));
});
