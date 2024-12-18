const { Notification, NotificationPreference, User } = require('../models');
const NotificationDispatcher = require('./notifications/notificationDispatcher');
const NotificationScheduler = require('./notifications/notificationScheduler');

class NotificationService {
  static async createNotification(data) {
    const { userId, type, title, message, metadata = {}, scheduledFor } = data;
    
    const [user, preferences] = await Promise.all([
      User.findByPk(userId),
      NotificationPreference.findOne({ where: { userId } })
    ]);
    
    if (!user || !preferences) {
      throw new Error('User or preferences not found');
    }

    const notification = await Notification.create({
      userId,
      type,
      title,
      message,
      metadata,
      scheduledFor
    });

    if (scheduledFor) {
      await NotificationScheduler.scheduleNotification(notification);
    } else {
      await NotificationDispatcher.dispatch(notification, user, preferences);
    }

    return notification;
  }

  static async getUserNotifications(userId, query = {}) {
    const { page = 1, limit = 10, status } = query;
    const where = { userId };

    if (status) {
      where.status = status;
    }

    return await Notification.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });
  }

  static async markAsRead(notificationId, userId) {
    const notification = await Notification.findOne({
      where: { id: notificationId, userId }
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return await notification.update({
      status: 'read',
      readAt: new Date()
    });
  }

  static async updatePreferences(userId, preferences) {
    const [userPreferences] = await NotificationPreference.findOrCreate({
      where: { userId }
    });

    return await userPreferences.update(preferences);
  }
}

module.exports = NotificationService;