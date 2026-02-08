import http from 'http';
import dotenv from 'dotenv';
import { Router } from './router.js';
import { testConnection } from './models/db.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { register, login } from './controllers/authController.js';
import { translate } from './controllers/translationController.js';
import { getHistory, getFavorites, addFavorite, removeFavorite } from './controllers/historyController.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const router = new Router();

// Parse JSON body middleware
async function parseJSON(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                req.body = body ? JSON.parse(body) : {};
                next();
            } catch (error) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else {
        req.body = {};
        next();
    }
}

// CORS middleware
function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }

    next();
}

// Define routes
// Public routes
router.post('/api/auth/register', parseJSON, register);
router.post('/api/auth/login', parseJSON, login);

// Public translation endpoint (no auth required for testing)
router.post('/api/translate/public', parseJSON, translate);

// Protected routes (require authentication)
router.post('/api/translate', parseJSON, authMiddleware, translate);
router.get('/api/history', authMiddleware, getHistory);
router.get('/api/favorites', authMiddleware, getFavorites);
router.post('/api/favorites/:id', authMiddleware, addFavorite);
router.delete('/api/favorites/:id', authMiddleware, removeFavorite);

// Health check route
router.get('/api/health', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'OK', message: 'Server is running' }));
});

// Root route
router.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        message: 'Translation API Server',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            translate: '/api/translate/public',
            register: '/api/auth/register',
            login: '/api/auth/login'
        }
    }));
});

// Create HTTP server
const server = http.createServer(async (req, res) => {
    // Apply CORS
    corsMiddleware(req, res, async () => {
        // Apply rate limiting
        rateLimiter(req, res, async () => {
            // Handle route
            await router.handle(req, res);
        });
    });
});

// Start server
async function startServer() {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.error('⚠️  Warning: Database connection failed. Please check your .env configuration.');
        console.error('The server will start, but database operations will fail.');
    }

    server.listen(PORT, () => {
        console.log(`\n🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        console.log(`\n📝 Available endpoints:`);
        console.log(`   POST /api/auth/register - Register new user`);
        console.log(`   POST /api/auth/login - Login user`);
        console.log(`   POST /api/translate/public - Translate text (public, no auth)`);
        console.log(`   POST /api/translate - Translate text (protected)`);
        console.log(`   GET  /api/history - Get translation history (protected)`);
        console.log(`   GET  /api/favorites - Get favorites (protected)`);
        console.log(`   POST /api/favorites/:id - Add to favorites (protected)`);
        console.log(`   DELETE /api/favorites/:id - Remove from favorites (protected)`);
        console.log(`\n⚡ Rate limit: 100 requests per 15 minutes per IP`);
        console.log(`\n💡 Press Ctrl+C to stop the server\n`);
    });
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n👋 SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n👋 SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Start the server
startServer();
