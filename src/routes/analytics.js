const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const NotificationAnalyticsService = require('../services/notifications/notificationAnalyticsService');

// Get notification delivery statistics (Admin only)
router.get(
  '/notifications/delivery',
  auth,
  authorize('admin'),
  async (req, res) => {
    try {
      const stats = await NotificationAnalyticsService.getDeliveryStats(
        req.query.timeframe
      );
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get user engagement metrics (Admin and Trainer)
router.get(
  '/notifications/engagement/:userId',
  auth,
  authorize('admin', 'trainer'),
  async (req, res) => {
    try {
      const engagement = await NotificationAnalyticsService.getUserEngagement(
        req.params.userId,
        req.query.days
      );
      res.json(engagement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;