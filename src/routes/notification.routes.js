import express from 'express';
import { NotificationController } from '../controllers/notification.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create notification
router.post('/', requireAuth, NotificationController.createNotification);

// Get all notifications for a restaurant
router.get('/restaurant/:restaurant_id', requireAuth, NotificationController.getNotifications);

// Mark notification as read
router.put('/:id/read', requireAuth, NotificationController.markNotificationAsRead);

// Delete notification
router.delete('/:id', requireAuth, NotificationController.deleteNotification);

export default router;
