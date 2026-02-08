/**
 * Custom Error Classes
 */

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

export class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}

export class AuthorizationError extends AppError {
    constructor(message = 'Access denied') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Resource already exists') {
        super(message, 409);
    }
}

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
    }

    // SQLite errors
    if (err.code === 'SQLITE_CONSTRAINT') {
        error = new ConflictError('Duplicate entry or constraint violation');
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = new AuthenticationError('Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        error = new AuthenticationError('Token expired');
    }

    // Default to 500 server error
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

/**
 * Async Handler - Wraps async route handlers to catch errors
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
