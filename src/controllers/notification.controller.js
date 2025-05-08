import { NotificationModel } from '../models/notification.model.js';
import { RestaurantModel } from '../models/restaurant.model.js';

export const NotificationController = {
  // Create notification
  createNotification: async (req, res) => {
    try {
      const { restaurant_id, message, type } = req.body;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: `Forbidden: You do not have permission to add notifications for restaurant ID ${restaurant_id}` });
      }
      const { data, error } = await NotificationModel.create({ restaurant_id, message, type });
      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to create notification: ${err.message}` });
    }
  },

  // Get all notifications for a restaurant
  getNotifications: async (req, res) => {
    try {
      const { restaurant_id } = req.params;
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: `Forbidden: You do not have permission to view notifications for restaurant ID ${restaurant_id}` });
      }
      const { data, error } = await NotificationModel.getByRestaurant(restaurant_id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to fetch notifications: ${err.message}` });
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (req, res) => {
    try {
      const { id } = req.params;
      // Optional: Ownership check by fetching notification and its restaurant
      const { data: notification, error: notifError } = await NotificationModel.getById(id);
      if (notifError) throw notifError;
      if (!notification) return res.status(404).json({ error: 'Notification not found' });
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(notification.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: `Forbidden: You do not have permission to mark notifications for restaurant ID ${notification.restaurant_id}` });
      }
      const { data, error } = await NotificationModel.markAsRead(id);
      if (error) throw error;
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: `Failed to mark notification as read: ${err.message}` });
    }
  },

  // Delete notification
  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params;
      // Optional: Ownership check by fetching notification and its restaurant
      const { data: notification, error: notifError } = await NotificationModel.getById(id);
      if (notifError) throw notifError;
      if (!notification) return res.status(404).json({ error: 'Notification not found' });
      // Ownership check
      const { data: restaurant, error: restError } = await RestaurantModel.getProfile(notification.restaurant_id);
      if (restError) throw restError;
      if (!restaurant || restaurant.owner_id !== req.user.id) {
        return res.status(403).json({ error: `Forbidden: You do not have permission to delete notifications for restaurant ID ${notification.restaurant_id}` });
      }
      const { error } = await NotificationModel.delete(id);
      if (error) throw error;
      res.json({ message: 'Notification deleted successfully.' });
    } catch (err) {
      res.status(400).json({ error: `Failed to delete notification: ${err.message}` });
    }
  }
};
