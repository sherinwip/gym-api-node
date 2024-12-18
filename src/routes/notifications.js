const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const NotificationController = require('../controllers/notificationController');

// Get user notifications
router.get(
  '/',
  auth,
  NotificationController.getNotifications
);

// Mark notification as read
router.patch(
  '/:id/read',
  auth,
  NotificationController.markAsRead
);

// Update notification preferences
router.put(
  '/preferences',
  auth,
  NotificationController.updatePreferences
);

// Create notification (Admin only)
router.post(
  '/',
  auth,
  authorize('admin'),
  NotificationController.createNotification
);

module.exports = router;