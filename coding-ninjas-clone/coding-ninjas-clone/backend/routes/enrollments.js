import express from 'express';
import { enrollCourse, getMyCourses, updateProgress, checkEnrollment } from '../controllers/enrollmentController.js';
import { protect } from '../middleware/auth.js';
import { enrollmentValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.post('/', protect, enrollmentValidation, validate, enrollCourse);
router.get('/my-courses', protect, getMyCourses);
router.put('/:id/progress', protect, updateProgress);
router.get('/check/:courseId', protect, checkEnrollment);

export default router;
