import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import categoryRoutes from './routes/categories.js';
import enrollmentRoutes from './routes/enrollments.js';
import paymentRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';
import leadRoutes from './routes/leads.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Initialize database
initDatabase();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Coding Ninjas API is running',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leads', leadRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   🚀 Coding Ninjas API Server Running        ║
║                                               ║
║   📍 Port: ${PORT}                              ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}              ║
║   📡 Health Check: http://localhost:${PORT}/api/health
║                                               ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;
