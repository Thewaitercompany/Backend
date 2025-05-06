import express from 'express';
import { WastageController } from '../controllers/wastage.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create wastage record
router.post('/', requireAuth, WastageController.createWastage);

// Get all wastage records for a restaurant
router.get('/restaurant/:restaurant_id', requireAuth, WastageController.getWastage);

// Update wastage record
router.put('/:id', requireAuth, WastageController.updateWastage);

// Delete wastage record
router.delete('/:id', requireAuth, WastageController.deleteWastage);

export default router;
