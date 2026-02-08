import { getDatabase } from '../config/database.js';
import { successResponse, paginate } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all courses with filters
 * @route   GET /api/courses
 * @access  Public
 */
export const getCourses = asyncHandler(async (req, res) => {
    const { category, level, search, page = 1, limit = 10, minPrice, maxPrice } = req.query;
    const db = getDatabase();

    let query = `
    SELECT c.*, cat.name as category_name, cat.icon as category_icon,
           i.id as instructor_id, u.name as instructor_name
    FROM courses c
    LEFT JOIN categories cat ON c.category_id = cat.id
    LEFT JOIN instructors i ON c.instructor_id = i.id
    LEFT JOIN users u ON i.user_id = u.id
    WHERE c.status = 'active'
  `;

    const params = [];

    if (category) {
        query += ' AND cat.name = ?';
        params.push(category);
    }

    if (level) {
        query += ' AND c.level = ?';
        params.push(level);
    }

    if (search) {
        query += ' AND (c.title LIKE ? OR c.description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
        query += ' AND c.price >= ?';
        params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
        query += ' AND c.price <= ?';
        params.push(parseFloat(maxPrice));
    }

    query += ' ORDER BY c.created_at DESC';

    // Get total count
    const countQuery = `
    SELECT COUNT(*) as total
    FROM courses c
    LEFT JOIN categories cat ON c.category_id = cat.id
    LEFT JOIN instructors i ON c.instructor_id = i.id
    LEFT JOIN users u ON i.user_id = u.id
    WHERE c.status = 'active'
    ${category ? ' AND cat.name = ?' : ''}
    ${level ? ' AND c.level = ?' : ''}
    ${search ? ' AND (c.title LIKE ? OR c.description LIKE ?)' : ''}
    ${minPrice ? ' AND c.price >= ?' : ''}
    ${maxPrice ? ' AND c.price <= ?' : ''}
  `;
    const countParams = [];
    if (category) countParams.push(category);
    if (level) countParams.push(level);
    if (search) countParams.push(`%${search}%`, `%${search}%`);
    if (minPrice) countParams.push(parseFloat(minPrice));
    if (maxPrice) countParams.push(parseFloat(maxPrice));

    const { total } = db.prepare(countQuery).get(...countParams);

    // Add pagination
    const { limit: limitNum, offset } = paginate(parseInt(page), parseInt(limit));
    query += ` LIMIT ? OFFSET ?`;
    params.push(limitNum, offset);

    const courses = db.prepare(query).all(...params);

    res.json(successResponse({
        courses,
        pagination: {
            page: parseInt(page),
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
        }
    }));
});

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
export const getCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const db = getDatabase();

    const course = db.prepare(`
    SELECT c.*, cat.name as category_name, cat.icon as category_icon,
           i.id as instructor_id, u.name as instructor_name, i.bio as instructor_bio,
           i.rating as instructor_rating, i.students_taught
    FROM courses c
    LEFT JOIN categories cat ON c.category_id = cat.id
    LEFT JOIN instructors i ON c.instructor_id = i.id
    LEFT JOIN users u ON i.user_id = u.id
    WHERE c.id = ?
  `).get(id);

    if (!course) {
        throw new NotFoundError('Course not found');
    }

    res.json(successResponse(course));
});

/**
 * @desc    Create new course
 * @route   POST /api/courses
 * @access  Private (Admin/Instructor)
 */
export const createCourse = asyncHandler(async (req, res) => {
    const { title, description, category_id, price, duration, level, image_url } = req.body;
    const db = getDatabase();

    // Get instructor ID for the current user
    let instructorId;
    if (req.user.role === 'instructor') {
        const instructor = db.prepare('SELECT id FROM instructors WHERE user_id = ?').get(req.user.id);
        if (!instructor) {
            throw new NotFoundError('Instructor profile not found');
        }
        instructorId = instructor.id;
    } else if (req.user.role === 'admin') {
        // Admin can specify instructor or use first available
        const instructor = db.prepare('SELECT id FROM instructors LIMIT 1').get();
        instructorId = instructor.id;
    }

    const result = db.prepare(`
    INSERT INTO courses (title, description, category_id, instructor_id, price, duration, level, image_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, description, category_id, instructorId, price, duration, level, image_url || null, 'active');

    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(successResponse(course, 'Course created successfully'));
});

/**
 * @desc    Update course
 * @route   PUT /api/courses/:id
 * @access  Private (Admin/Instructor)
 */
export const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id, price, duration, level, image_url, status } = req.body;
    const db = getDatabase();

    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
    if (!course) {
        throw new NotFoundError('Course not found');
    }

    db.prepare(`
    UPDATE courses
    SET title = ?, description = ?, category_id = ?, price = ?, duration = ?, level = ?, image_url = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
        title || course.title,
        description || course.description,
        category_id || course.category_id,
        price !== undefined ? price : course.price,
        duration || course.duration,
        level || course.level,
        image_url !== undefined ? image_url : course.image_url,
        status || course.status,
        id
    );

    const updatedCourse = db.prepare('SELECT * FROM courses WHERE id = ?').get(id);

    res.json(successResponse(updatedCourse, 'Course updated successfully'));
});

/**
 * @desc    Delete course
 * @route   DELETE /api/courses/:id
 * @access  Private (Admin)
 */
export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const db = getDatabase();

    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
    if (!course) {
        throw new NotFoundError('Course not found');
    }

    db.prepare('DELETE FROM courses WHERE id = ?').run(id);

    res.json(successResponse(null, 'Course deleted successfully'));
});
