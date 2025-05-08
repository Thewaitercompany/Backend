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
        return res.status(403).json({ error: 'Access denied. You are not authorized to add staff to this restaurant.' });
      }
      // Create staff
      const { data, error } = await StaffModel.create(req.body);
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to create staff: ${err.message}` });
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
        return res.status(403).json({ error: 'Access denied: You are not authorized to view staff for this restaurant.'  });
      }
      // Get staff
      const { data, error } = await StaffModel.getAllByRestaurant(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to retrieve staff: ${err.message}` });
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
        return res.status(403).json({ error: 'Access denied: You are not authorized to view this staff member.' });
      }
      res.json(staff);
    } catch (err) {
      res.status(404).json({ error: `Failed to get staff details: ${err.message}` });
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
        return res.status(403).json({ error: 'Access denied: You are not authorized to update this staff member.' });
      }
      // Update staff
      const { data, error } = await StaffModel.update(req.params.id, req.body);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to update staff: ${err.message}` });
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
        return res.status(403).json({ error: 'Access denied: You are not authorized to delete this staff member.' });
      }
      // Delete staff
      const { error } = await StaffModel.delete(req.params.id);
      if (error) throw error;
      res.json({ message: 'Staff deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete staff: ${err.message}` });
    }
  }
};
