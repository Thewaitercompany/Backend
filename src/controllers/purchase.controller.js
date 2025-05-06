import { PurchaseModel } from '../models/purchase.model.js';
import { RestaurantModel } from '../models/restaurant.model.js';

export const PurchaseController = {
  // Create purchase record
  createPurchase: async (req, res) => {
    try {
      const {
        restaurant_id, ingredient_id, quantity, unit, cost_per_unit, total_cost,
        supplier, invoice_no, purchase_date, delivery_date, status
      } = req.body;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { data, error } = await PurchaseModel.create({
        restaurant_id, ingredient_id, quantity, unit, cost_per_unit, total_cost,
        supplier, invoice_no, purchase_date, delivery_date, status
      });
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all purchases for a restaurant
  getPurchases: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { data, error } = await PurchaseModel.getByRestaurant(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update purchase record
  updatePurchase: async (req, res) => {
    try {
      const { id } = req.params;
      // Get purchase and restaurant for ownership check
      const { data: purchase, error: purchaseError } = await PurchaseModel.getById(id);
      if (purchaseError) throw purchaseError;
      if (!purchase) return res.status(404).json({ error: 'Purchase not found' });
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(purchase.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { data, error } = await PurchaseModel.update(id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete purchase record
  deletePurchase: async (req, res) => {
    try {
      const { id } = req.params;
      // Get purchase and restaurant for ownership check
      const { data: purchase, error: purchaseError } = await PurchaseModel.getById(id);
      if (purchaseError) throw purchaseError;
      if (!purchase) return res.status(404).json({ error: 'Purchase not found' });
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(purchase.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      const { error } = await PurchaseModel.delete(id);
      if (error) throw error;
      res.json({ message: 'Purchase record deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
