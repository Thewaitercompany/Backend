import { StaffModel } from '../models/staff.model.js';
import { RestaurantModel } from '../models/restaurant.model.js';

export const StaffController = {
  // Create staff
  createStaff: async (req, res) => {
    try {
      // Get the restaurant
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(req.body.restaurant_id);
      if (restError) throw restError;
      // Check ownership
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      // Create staff
      const { data, error } = await StaffModel.create(req.body);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all staff for a restaurant
  getAllStaff: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      // Get the restaurant
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      // Check ownership
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      // Get staff
      const { data, error } = await StaffModel.getAllByRestaurant(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get single staff member
  getStaffById: async (req, res) => {
    try {
      // Get staff
      const { data: staff, error: staffError } = await StaffModel.getById(req.params.id);
      if (staffError) throw staffError;
      if (!staff) return res.status(404).json({ error: 'Staff not found' });
      // Get the restaurant
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(staff.restaurant_id);
      if (restError) throw restError;
      // Check ownership
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      res.json(staff);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // Update staff
  updateStaff: async (req, res) => {
    try {
      // Get staff
      const { data: staff, error: staffError } = await StaffModel.getById(req.params.id);
      if (staffError) throw staffError;
      if (!staff) return res.status(404).json({ error: 'Staff not found' });
      // Get the restaurant
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(staff.restaurant_id);
      if (restError) throw restError;
      // Check ownership
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      // Update staff
      const { data, error } = await StaffModel.update(req.params.id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete staff
  deleteStaff: async (req, res) => {
    try {
      // Get staff
      const { data: staff, error: staffError } = await StaffModel.getById(req.params.id);
      if (staffError) throw staffError;
      if (!staff) return res.status(404).json({ error: 'Staff not found' });
      // Get the restaurant
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(staff.restaurant_id);
      if (restError) throw restError;
      // Check ownership
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: Not your restaurant' });
      }
      // Delete staff
      const { error } = await StaffModel.delete(req.params.id);
      if (error) throw error;
      res.json({ message: 'Staff deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
