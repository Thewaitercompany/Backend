import express from 'express';
import { OrderItemController } from '../controllers/orderItem.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create order item
router.post('/',  OrderItemController.createOrderItem);

// Get all order items for a specific order
router.get('/order/:orderId', OrderItemController.getOrderItemsByOrder);

// Get a single order item
router.get('/:id',  OrderItemController.getOrderItemById);

// Update an order item
router.put('/:id', requireAuth, OrderItemController.updateOrderItem);

// Delete an order item
router.delete('/:id',  OrderItemController.deleteOrderItem);

export default router;
