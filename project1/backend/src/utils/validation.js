// Validation helper functions

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    // At least 6 characters
    return password && password.length >= 6;
}

export function validateUsername(username) {
    // 3-50 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
    return usernameRegex.test(username);
}

export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    // Remove potential XSS characters
    return input.trim().replace(/[<>]/g, '');
}
