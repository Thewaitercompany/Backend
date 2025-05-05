import { RestaurantModel } from '../models/restaurant.model.js';

export const RestaurantController = {
  getRestaurantProfile: async (req, res) => {
    try {
      const { data, error } = await RestaurantModel.getProfile(req.params.id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateRestaurantProfile: async (req, res) => {
    try {
      const { data, error } = await RestaurantModel.updateProfile(
        req.params.id,
        req.body
      );
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  createRestaurant: async (req, res) => {
    try {
      const { data, error } = await RestaurantModel.create(req.body);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deleteRestaurant: async (req, res) => {
    try {
      const { id } = req.params;
      const { error } = await RestaurantModel.delete(id);
      if (error) throw error;
      res.json({ message: 'Restaurant deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
