import { RestaurantModel } from '../models/restaurant.model.js';

export const RestaurantController = {
  // Only allow owner to access their restaurant profile
  getMyRestaurants: async (req, res) => {
    try {
      const ownerId = req.user.id; // Comes from requireAuth middleware
      const { data, error } = await RestaurantModel.getMyRestaurants(ownerId);

      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: `Failed to retrieve your restaurants: ${err.message}` });
    }
  },

  // Only allow owner to update their restaurant
  updateRestaurantProfile: async (req, res) => {
    try {
      // Fetch the restaurant first
      const { data: restaurant, error: fetchError } = await RestaurantModel.getProfile(req.params.id);
      if (fetchError) throw fetchError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: You do not have permission to update this restaurant' });
      }
      // Only owner can update
      const { data, error } = await RestaurantModel.updateProfile(req.params.id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to update restaurant profile: ${err.message}` });
    }
  },

  // Only allow owner to delete their restaurant
  deleteRestaurant: async (req, res) => {
    try {
      // Fetch the restaurant first
      const { data: restaurant, error: fetchError } = await RestaurantModel.getProfile(req.params.id);
      if (fetchError) throw fetchError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: You do not have permission to delete this restaurant' });
      }
      // Only owner can delete
      const { error } = await RestaurantModel.delete(req.params.id);
      if (error) throw error;
      res.json({ message: 'Restaurant deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete restaurant: ${err.message}` });
    }
  },

  // When creating, set owner_id to the logged-in user
  createRestaurant: async (req, res) => {
    try {
      const restaurantData = { ...req.body, owner_id: req.user.id };
      const { data, error } = await RestaurantModel.create(restaurantData);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to create restaurant: ${err.message}` });
    }
  }
};