import express from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/auth.js';
import { courseValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);

// Protected routes
router.post('/', protect, authorize('admin', 'instructor'), courseValidation, validate, createCourse);
router.put('/:id', protect, authorize('admin', 'instructor'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

export default router;
