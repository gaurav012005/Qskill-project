import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import lessonRoutes from './routes/lessons.js';
import enrollmentRoutes from './routes/enrollments.js';
import progressRoutes from './routes/progress.js';
import quizRoutes from './routes/quizzes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware for debugging
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quizzes', quizRoutes);

// Root route - API info
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to EduRoute API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth/*',
            courses: '/api/courses/*',
            lessons: '/api/lessons/*',
            enrollments: '/api/enrollments/*',
            progress: '/api/progress/*',
            quizzes: '/api/quizzes/*'
        },
        documentation: 'See README.md for full API documentation'
    });
});

// API base route - same as root
app.get('/api', (req, res) => {
    res.json({
        message: 'EduRoute API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth/*',
            courses: '/api/courses/*',
            lessons: '/api/lessons/*',
            enrollments: '/api/enrollments/*',
            progress: '/api/progress/*',
            quizzes: '/api/quizzes/*'
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'EduRoute API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        error: 'Route not found',
        requestedUrl: req.url,
        method: req.method,
        availableRoutes: [
            '/api/auth/*',
            '/api/courses/*',
            '/api/lessons/*',
            '/api/enrollments/*',
            '/api/progress/*',
            '/api/quizzes/*'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 EduRoute API ready at http://localhost:${PORT}/api`);
});
