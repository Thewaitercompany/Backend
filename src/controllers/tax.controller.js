import { TaxModel } from '../models/tax.model.js';
import { RestaurantModel } from '../models/restaurant.model.js';

export const TaxController = {
  // Create tax
  createTax: async (req, res) => {
    try {
      const { restaurant_id, tax_name, percent } = req.body;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied: You do not own this restaurant.' });
      }
      const { data, error } = await TaxModel.create({ restaurant_id, tax_name, percent });
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to create tax: ${err.message}` });
    }
  },

  // Get all taxes for a restaurant
  getTaxes: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied: You do not own this restaurant.' });
      }
      const { data, error } = await TaxModel.getByRestaurant(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to retrieve taxes: ${err.message}` });
    }
  },

  // Update tax
  updateTax: async (req, res) => {
    try {
      const { id } = req.params;
      // Get tax and restaurant for ownership check
      const { data: tax, error: taxError } = await TaxModel.getById(id);
      if (taxError) throw taxError;
      if (!tax) return res.status(404).json({ error: 'Tax not found' });
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(tax.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied: You do not own this restaurant.' });
      }
      const { data, error } = await TaxModel.update(id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to update tax: ${err.message}` });
    }
  },

  // Delete tax
  deleteTax: async (req, res) => {
    try {
      const { id } = req.params;
      // Get tax and restaurant for ownership check
      const { data: tax, error: taxError } = await TaxModel.getById(id);
      if (taxError) throw taxError;
      if (!tax) return res.status(404).json({ error: 'Tax not found' });
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(tax.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied: You do not own this restaurant.' });
      }
      const { error } = await TaxModel.delete(id);
      if (error) throw error;
      res.json({ message: 'Tax deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete tax: ${err.message}` });
    }
  }
};
