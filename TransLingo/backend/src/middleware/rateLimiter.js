// Rate limiter middleware
// Tracks requests per IP address and limits to prevent abuse

const requestCounts = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Max requests per window

export function rateLimiter(req, res, next) {
    const ip = req.socket.remoteAddress;
    const now = Date.now();

    // Get or create request log for this IP
    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, []);
    }

    const requests = requestCounts.get(ip);

    // Remove old requests outside the time window
    const validRequests = requests.filter(timestamp => now - timestamp < WINDOW_MS);

    // Check if limit exceeded
    if (validRequests.length >= MAX_REQUESTS) {
        res.statusCode = 429;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Retry-After', Math.ceil(WINDOW_MS / 1000));
        res.end(JSON.stringify({
            error: 'Too many requests, please try again later',
            retryAfter: Math.ceil(WINDOW_MS / 1000)
        }));
        return;
    }

    // Add current request
    validRequests.push(now);
    requestCounts.set(ip, validRequests);

    next();
}

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [ip, requests] of requestCounts.entries()) {
        const validRequests = requests.filter(timestamp => now - timestamp < WINDOW_MS);
        if (validRequests.length === 0) {
            requestCounts.delete(ip);
        } else {
            requestCounts.set(ip, validRequests);
        }
    }
}, WINDOW_MS);
