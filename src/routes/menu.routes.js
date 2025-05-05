import express from 'express';
import { MenuController } from '../controllers/menu.controller.js';

const router = express.Router({ mergeParams: true });

// Get all menu items for a restaurant
router.get('/:restaurant_id/menu', MenuController.getMenu);

// Get a single menu item
router.get('/:restaurant_id/menu/items/:item_id', MenuController.getMenuItem);

// Add a new menu item
router.post('/:restaurant_id/menu/items', MenuController.addMenuItem);

// Update a menu item
router.put('/:restaurant_id/menu/items/:item_id', MenuController.updateMenuItem);

// Delete a menu item
router.delete('/:restaurant_id/menu/items/:item_id', MenuController.deleteMenuItem);

export default router;
