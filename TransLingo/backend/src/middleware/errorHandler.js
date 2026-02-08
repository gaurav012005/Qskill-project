// Global error handler middleware

export function errorHandler(error, req, res) {
    console.error('Error:', error);

    // Default error response
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }));
}
