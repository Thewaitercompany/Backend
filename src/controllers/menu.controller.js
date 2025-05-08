import { MenuModel } from '../models/menu.model.js';

export const MenuController = {
  // GET all menu items (with optional filters)
  getMenu: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const { category, is_veg } = req.query;
      const filters = {};
      if (category) filters.category = category;
      if (is_veg !== undefined) filters.is_veg = is_veg === 'true';

      const { data, error } = await MenuModel.getAll(restaurant_id, filters);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: `Failed to fetch menu for restaurant ${req.params.restaurant_id}: ${err.message}` });
    }
  },

  // GET a single menu item
  getMenuItem: async (req, res) => {
    try {
      const { item_id } = req.params;
      const { data, error } = await MenuModel.getById(item_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: `Menu item with ID ${req.params.item_id} not found: ${err.message}` });
    }
  },

  // POST add a new menu item
  addMenuItem: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      const { data, error } = await MenuModel.create(restaurant_id, req.body);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to add new menu item: ${err.message}` });
    }
  },

  // PUT update a menu item
  updateMenuItem: async (req, res) => {
    try {
      const { item_id } = req.params;
      const { data, error } = await MenuModel.update(item_id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to update menu item with ID ${req.params.item_id}: ${err.message}` });
    }
  },

  // DELETE a menu item
  deleteMenuItem: async (req, res) => {
    try {
      const { item_id } = req.params;
      const { error } = await MenuModel.remove(item_id);
      if (error) throw error;
      res.json({ message: 'Menu item deleted' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete menu item with ID ${req.params.item_id}: ${err.message}` });
    }
  }
};
