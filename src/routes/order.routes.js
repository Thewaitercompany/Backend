import express from 'express';
import { OrderController } from '../controllers/order.controller.js';

const router = express.Router({ mergeParams: true });

// Get all orders for a restaurant (with optional filters)
router.get('/:restaurant_id/orders', OrderController.getOrders);

// Get a single order
router.get('/:restaurant_id/orders/:order_id', OrderController.getOrder);

// Create a new order
router.post('/:restaurant_id/orders', OrderController.addOrder);

// Update an order
router.put('/:restaurant_id/orders/:order_id', OrderController.updateOrder);

// Delete an order
router.delete('/:restaurant_id/orders/:order_id', OrderController.deleteOrder);

export default router;
