import { TableModel } from '../models/table.model.js';

export const TableController = {
  // GET all tables for a restaurant
  getTables: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const { data, error } = await TableModel.getAll(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: `Failed to retrieve tables: ${err.message}` });
    }
  },

  // GET a single table
  getTable: async (req, res) => {
    try {
      const { table_id } = req.params;
      const { data, error } = await TableModel.getById(table_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: `Failed to retrieve table: ${err.message}` });
    }
  },

  // POST add a new table
  addTable: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const { table_number } = req.body;

          // Uniqueness check: Is there already a table with this number for this restaurant?
    const { data: existing, error: findError } = await TableModel.getByTableNumber(restaurant_id, table_number);
    if (findError) throw findError;
    if (existing) {
      return res.status(409).json({ error: 'Table number already exists for this restaurant.' });
    }

      // Proceed to create if unique
      const { data, error } = await TableModel.create(restaurant_id, req.body);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to create table: ${err.message}` });
    }
  },

  // PUT update a table (e.g., status, capacity)
  updateTable: async (req, res) => {
    try {
      const { table_id } = req.params;
      const { data, error } = await TableModel.update(table_id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to update table: ${err.message}` });
    }
  },

  // DELETE a table
  deleteTable: async (req, res) => {
    try {
      const { table_id } = req.params;
      const { error } = await TableModel.remove(table_id);
      if (error) throw error;
      res.json({ message: 'Table deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete table: ${err.message}` });
    }
  },
  
  
};