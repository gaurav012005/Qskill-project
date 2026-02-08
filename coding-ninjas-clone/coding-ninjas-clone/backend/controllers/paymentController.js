import { getDatabase } from '../config/database.js';
import { successResponse } from '../utils/helpers.js';
import { NotFoundError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import crypto from 'crypto';

/**
 * @desc    Create payment order
 * @route   POST /api/payments/create-order
 * @access  Private
 */
export const createOrder = asyncHandler(async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;
    const db = getDatabase();

    // Get course details
    const course = db.prepare('SELECT * FROM courses WHERE id = ? AND status = ?').get(course_id, 'active');
    if (!course) {
        throw new NotFoundError('Course not found');
    }

    // Generate transaction ID
    const transactionId = `TXN_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Create payment record
    const result = db.prepare(`
    INSERT INTO payments (user_id, course_id, amount, status, payment_method, transaction_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, course_id, course.price, 'pending', 'mock_gateway', transactionId);

    const payment = db.prepare('SELECT * FROM payments WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(successResponse({
        payment,
        order_id: transactionId,
        amount: course.price,
        currency: 'INR'
    }, 'Payment order created successfully'));
});

/**
 * @desc    Verify payment (Mock)
 * @route   POST /api/payments/verify
 * @access  Private
 */
export const verifyPayment = asyncHandler(async (req, res) => {
    const { transaction_id, payment_status } = req.body;
    const userId = req.user.id;
    const db = getDatabase();

    // Get payment
    const payment = db.prepare('SELECT * FROM payments WHERE transaction_id = ? AND user_id = ?').get(transaction_id, userId);
    if (!payment) {
        throw new NotFoundError('Payment not found');
    }

    // Mock verification - in real scenario, verify with payment gateway
    const status = payment_status === 'success' ? 'completed' : 'failed';

    // Update payment status
    db.prepare('UPDATE payments SET status = ? WHERE id = ?').run(status, payment.id);

    // If payment successful, create enrollment
    if (status === 'completed') {
        // Check if already enrolled
        const existingEnrollment = db.prepare('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?').get(userId, payment.course_id);

        if (!existingEnrollment) {
            db.prepare(`
        INSERT INTO enrollments (user_id, course_id, status, progress_percentage)
        VALUES (?, ?, ?, ?)
      `).run(userId, payment.course_id, 'active', 0);

            // Update course enrollment count
            db.prepare('UPDATE courses SET enrollment_count = enrollment_count + 1 WHERE id = ?').run(payment.course_id);
        }
    }

    const updatedPayment = db.prepare('SELECT * FROM payments WHERE id = ?').get(payment.id);

    res.json(successResponse({
        payment: updatedPayment,
        verified: status === 'completed'
    }, `Payment ${status}`));
});

/**
 * @desc    Get payment history
 * @route   GET /api/payments/history
 * @access  Private
 */
export const getPaymentHistory = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const db = getDatabase();

    const payments = db.prepare(`
    SELECT p.*, c.title as course_title, c.image_url
    FROM payments p
    JOIN courses c ON p.course_id = c.id
    WHERE p.user_id = ?
    ORDER BY p.created_at DESC
  `).all(userId);

    res.json(successResponse(payments));
});
