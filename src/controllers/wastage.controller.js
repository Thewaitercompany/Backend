import { WastageModel } from '../models/wastage.model.js';
import { RestaurantModel } from '../models/restaurant.model.js';

export const WastageController = {
  // Create wastage record
  createWastage: async (req, res) => {
    try {
      const { restaurant_id, ingredient_id, quantity, unit, reason, date } = req.body;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { data, error } = await WastageModel.create({ restaurant_id, ingredient_id, quantity, unit, reason, date });
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all wastage records for a restaurant
  getWastage: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { data, error } = await WastageModel.getByRestaurant(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update wastage record
  updateWastage: async (req, res) => {
    try {
      const { id } = req.params;
      // Get wastage and restaurant for ownership check
      const { data: wastage, error: wastageError } = await WastageModel.getById(id);
      if (wastageError) throw wastageError;
      if (!wastage) return res.status(404).json({ error: 'Wastage not found' });
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(wastage.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { data, error } = await WastageModel.update(id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete wastage record
  deleteWastage: async (req, res) => {
    try {
      const { id } = req.params;
      // Get wastage and restaurant for ownership check
      const { data: wastage, error: wastageError } = await WastageModel.getById(id);
      if (wastageError) throw wastageError;
      if (!wastage) return res.status(404).json({ error: 'Wastage not found' });
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(wastage.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { error } = await WastageModel.delete(id);
      if (error) throw error;
      res.json({ message: 'Wastage record deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
