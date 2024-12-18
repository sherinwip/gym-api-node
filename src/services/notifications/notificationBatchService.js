const { Notification, User, NotificationPreference } = require('../../models');
const NotificationDispatcher = require('./notificationDispatcher');
const { Op } = require('sequelize');

class NotificationBatchService {
  static async processBatchNotifications(notifications) {
    const userIds = [...new Set(notifications.map(n => n.userId))];
    
    const [users, preferences] = await Promise.all([
      User.findAll({ where: { id: { [Op.in]: userIds } } }),
      NotificationPreference.findAll({ where: { userId: { [Op.in]: userIds } } })
    ]);

    const userMap = new Map(users.map(user => [user.id, user]));
    const preferenceMap = new Map(preferences.map(pref => [pref.userId, pref]));

    const dispatchPromises = notifications.map(notification => {
      const user = userMap.get(notification.userId);
      const preference = preferenceMap.get(notification.userId);
      
      if (user && preference) {
        return NotificationDispatcher.dispatch(notification, user, preference);
      }
      return Promise.resolve();
    });

    return Promise.all(dispatchPromises);
  }

  static async sendBulkNotifications(type, users, data) {
    const notifications = users.map(user => ({
      userId: user.id,
      type,
      ...data
    }));

    const createdNotifications = await Notification.bulkCreate(notifications);
    return this.processBatchNotifications(createdNotifications);
  }
}

module.exports = NotificationBatchService;