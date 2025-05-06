import express from 'express';
import { StaffController } from '../controllers/staff.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create staff
router.post('/', requireAuth, StaffController.createStaff);

// Get all staff for a restaurant
router.get('/restaurant/:restaurant_id', requireAuth, StaffController.getAllStaff);

// Get single staff member
router.get('/:id', requireAuth, StaffController.getStaffById);

// Update staff
router.put('/:id', requireAuth, StaffController.updateStaff);

// Delete staff
router.delete('/:id', requireAuth, StaffController.deleteStaff);

export default router;
