import express from 'express';
import { getAllUsers, getPlatformStats, updateUserRole, deleteUser } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin role
router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.get('/stats', getPlatformStats);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
