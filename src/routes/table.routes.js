import express from 'express';
import { TableController } from '../controllers/table.controller.js';

const router = express.Router({ mergeParams: true });

// Get all tables for a restaurant
router.get('/:restaurant_id/tables', TableController.getTables);

// Get a single table
router.get('/:restaurant_id/tables/:table_id', TableController.getTable);

// Add a new table
router.post('/:restaurant_id/tables', TableController.addTable);

// Update a table
router.put('/:restaurant_id/tables/:table_id', TableController.updateTable);

// Delete a table
router.delete('/:restaurant_id/tables/:table_id', TableController.deleteTable);

export default router;
