const { Notification } = require('../../models');
const { Op } = require('sequelize');

class NotificationCleanupService {
  static async cleanupOldNotifications(days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const deletedCount = await Notification.destroy({
      where: {
        createdAt: { [Op.lt]: cutoffDate },
        status: 'read'
      }
    });

    return deletedCount;
  }

  static async archiveNotifications(userId, beforeDate) {
    const notifications = await Notification.update(
      { status: 'archived' },
      {
        where: {
          userId,
          createdAt: { [Op.lt]: beforeDate },
          status: 'read'
        }
      }
    );

    return notifications[0];
  }

  static async deleteUserNotifications(userId) {
    return await Notification.destroy({
      where: { userId }
    });
  }
}

module.exports = NotificationCleanupService;