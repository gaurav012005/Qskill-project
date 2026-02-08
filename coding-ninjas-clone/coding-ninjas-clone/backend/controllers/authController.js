import { getDatabase } from '../config/database.js';
import { hashPassword, comparePassword, generateToken, successResponse } from '../utils/helpers.js';
import { ValidationError, AuthenticationError, ConflictError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
    const { email, password, name, phone } = req.body;
    const db = getDatabase();

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
        throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Insert user
    const result = db.prepare(`
    INSERT INTO users (email, password_hash, name, phone, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(email, passwordHash, name, phone || null, 'student');

    const userId = result.lastInsertRowid;

    // Generate token
    const token = generateToken(userId, 'student');

    // Get created user
    const user = db.prepare('SELECT id, email, name, phone, role, created_at FROM users WHERE id = ?').get(userId);

    res.status(201).json(successResponse({
        user,
        token
    }, 'User registered successfully'));
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const db = getDatabase();

    // Get user with password
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
        throw new AuthenticationError('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
        throw new AuthenticationError('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    // Remove password from response
    delete user.password_hash;

    res.json(successResponse({
        user,
        token
    }, 'Login successful'));
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
    const db = getDatabase();
    const user = db.prepare('SELECT id, email, name, phone, role, created_at FROM users WHERE id = ?').get(req.user.id);

    res.json(successResponse(user, 'User profile retrieved'));
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const { name, phone } = req.body;
    const db = getDatabase();

    db.prepare(`
    UPDATE users
    SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(name, phone || null, req.user.id);

    const user = db.prepare('SELECT id, email, name, phone, role, created_at FROM users WHERE id = ?').get(req.user.id);

    res.json(successResponse(user, 'Profile updated successfully'));
});
