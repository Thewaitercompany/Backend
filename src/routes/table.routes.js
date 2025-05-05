import express from 'express';
import { TableController } from '../controllers/table.controller.js';
import { requireAuth } from '../middleware/auth.js';


const router = express.Router({ mergeParams: true });

// Get all tables for a restaurant
router.get('/:restaurant_id/tables',requireAuth, TableController.getTables);

// Get a single table
router.get('/:restaurant_id/tables/:table_id', requireAuth,TableController.getTable);

// Add a new table
router.post('/:restaurant_id/tables',requireAuth, TableController.addTable);

// Update a table
router.put('/:restaurant_id/tables/:table_id',requireAuth, TableController.updateTable);

// Delete a table
router.delete('/:restaurant_id/tables/:table_id', requireAuth,TableController.deleteTable);

export default router;
