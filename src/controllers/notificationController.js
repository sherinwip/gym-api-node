const NotificationService = require('../services/notificationService');
const { validateNotification, validatePreferences } = require('../validators/notificationValidator');

class NotificationController {
  static async getNotifications(req, res) {
    try {
      const notifications = await NotificationService.getUserNotifications(
        req.user.id,
        req.query
      );
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async markAsRead(req, res) {
    try {
      const notification = await NotificationService.markAsRead(
        req.params.id,
        req.user.id
      );
      res.json(notification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updatePreferences(req, res) {
    try {
      const validatedData = await validatePreferences(req.body);
      const preferences = await NotificationService.updatePreferences(
        req.user.id,
        validatedData
      );
      res.json(preferences);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createNotification(req, res) {
    try {
      const validatedData = await validateNotification(req.body);
      const notification = await NotificationService.createNotification(validatedData);
      res.status(201).json(notification);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = NotificationController;