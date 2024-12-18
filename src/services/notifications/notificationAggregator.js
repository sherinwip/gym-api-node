const { Notification } = require('../../models');
const { Op } = require('sequelize');

class NotificationAggregator {
  static async aggregateUserNotifications(userId, timeframe = '24h') {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - parseInt(timeframe));

    const notifications = await Notification.findAll({
      where: {
        userId,
        createdAt: { [Op.gte]: cutoffDate },
        status: 'unread'
      },
      order: [['createdAt', 'DESC']]
    });

    return this.groupNotifications(notifications);
  }

  static groupNotifications(notifications) {
    const grouped = notifications.reduce((acc, notification) => {
      if (!acc[notification.type]) {
        acc[notification.type] = [];
      }
      acc[notification.type].push(notification);
      return acc;
    }, {});

    return Object.entries(grouped).map(([type, items]) => ({
      type,
      count: items.length,
      notifications: items
    }));
  }

  static async getNotificationStats(userId) {
    const stats = await Notification.findAll({
      where: { userId },
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('MAX', sequelize.col('createdAt')), 'lastNotification']
      ],
      group: ['type']
    });

    return stats.reduce((acc, stat) => {
      acc[stat.type] = {
        count: stat.get('count'),
        lastNotification: stat.get('lastNotification')
      };
      return acc;
    }, {});
  }
}

module.exports = NotificationAggregator;