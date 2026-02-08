import { verifyToken } from '../utils/helpers.js';
import { AuthenticationError, AuthorizationError } from './errorHandler.js';
import { getDatabase } from '../config/database.js';

/**
 * Protect routes - Verify JWT token
 */
export const protect = (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new AuthenticationError('Not authorized to access this route');
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            throw new AuthenticationError('Invalid or expired token');
        }

        // Get user from database
        const db = getDatabase();
        const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(decoded.id);

        if (!user) {
            throw new AuthenticationError('User not found');
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Authorize roles - Check if user has required role
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AuthenticationError('Not authenticated'));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AuthorizationError(`Role '${req.user.role}' is not authorized to access this route`));
        }

        next();
    };
};
