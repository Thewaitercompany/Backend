import express from 'express';
import { TaxController } from '../controllers/tax.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create tax
router.post('/', requireAuth, TaxController.createTax);

// Get all taxes for a restaurant
router.get('/restaurant/:restaurant_id', requireAuth, TaxController.getTaxes);

// Update tax
router.put('/:id', requireAuth, TaxController.updateTax);

// Delete tax
router.delete('/:id', requireAuth, TaxController.deleteTax);

export default router;
