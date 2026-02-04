import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { validateEmail, validatePassword, validateUsername, sanitizeInput } from '../utils/validation.js';

// Register new user
export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'All fields are required' }));
            return;
        }

        // Sanitize inputs
        const cleanUsername = sanitizeInput(username);
        const cleanEmail = sanitizeInput(email).toLowerCase();

        // Validate email
        if (!validateEmail(cleanEmail)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid email format' }));
            return;
        }

        // Validate username
        if (!validateUsername(cleanUsername)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Username must be 3-50 characters, alphanumeric and underscores only' }));
            return;
        }

        // Validate password
        if (!validatePassword(password)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Password must be at least 6 characters' }));
            return;
        }

        // Check if email already exists
        if (await User.emailExists(cleanEmail)) {
            res.statusCode = 409;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Email already registered' }));
            return;
        }

        // Check if username already exists
        if (await User.usernameExists(cleanUsername)) {
            res.statusCode = 409;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Username already taken' }));
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const userId = await User.create(cleanUsername, cleanEmail, hashedPassword);

        // Generate token
        const token = generateToken({ userId, email: cleanEmail });

        // Send response
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            message: 'User registered successfully',
            token,
            user: {
                id: userId,
                username: cleanUsername,
                email: cleanEmail
            }
        }));
    } catch (error) {
        console.error('Register error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Registration failed' }));
    }
}

// Login user
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Email and password are required' }));
            return;
        }

        // Sanitize email
        const cleanEmail = sanitizeInput(email).toLowerCase();

        // Find user
        const user = await User.findByEmail(cleanEmail);

        if (!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid email or password' }));
            return;
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid email or password' }));
            return;
        }

        // Generate token
        const token = generateToken({ userId: user.id, email: user.email });

        // Send response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }));
    } catch (error) {
        console.error('Login error:', error);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Login failed' }));
    }
}
