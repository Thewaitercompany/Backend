import express from 'express';
import { PurchaseController } from '../controllers/purchase.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create purchase record
router.post('/', requireAuth, PurchaseController.createPurchase);

// Get all purchases for a restaurant
router.get('/restaurant/:restaurant_id', requireAuth, PurchaseController.getPurchases);

// Update purchase record
router.put('/:id', requireAuth, PurchaseController.updatePurchase);

// Delete purchase record
router.delete('/:id', requireAuth, PurchaseController.deletePurchase);

export default router;
