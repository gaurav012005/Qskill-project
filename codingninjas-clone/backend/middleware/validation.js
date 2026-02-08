import { body, validationResult } from 'express-validator';
import { ValidationError } from './errorHandler.js';

/**
 * Validation middleware - Check for validation errors
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join(', ');
        return next(new ValidationError(errorMessages));
    }
    next();
};

/**
 * Registration validation rules
 */
export const registerValidation = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('phone')
        .optional()
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be 10 digits'),
];

/**
 * Login validation rules
 */
export const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

/**
 * Course creation validation rules
 */
export const courseValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Course title is required')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters long'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Course description is required'),
    body('category_id')
        .isInt()
        .withMessage('Valid category ID is required'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('level')
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Level must be beginner, intermediate, or advanced'),
];

/**
 * Enrollment validation rules
 */
export const enrollmentValidation = [
    body('course_id')
        .isInt()
        .withMessage('Valid course ID is required'),
];
