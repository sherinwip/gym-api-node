const { Notification } = require('../../models');
const { Op } = require('sequelize');

class NotificationAnalyticsService {
  static async getDeliveryStats(timeframe = '24h') {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - parseInt(timeframe));

    const stats = await Notification.findAll({
      where: {
        createdAt: { [Op.gte]: cutoffDate }
      },
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [
          sequelize.fn(
            'SUM',
            sequelize.literal("CASE WHEN status = 'read' THEN 1 ELSE 0 END")
          ),
          'read'
        ]
      ],
      group: ['type']
    });

    return stats.map(stat => ({
      type: stat.type,
      total: parseInt(stat.get('total')),
      read: parseInt(stat.get('read')),
      readRate: (parseInt(stat.get('read')) / parseInt(stat.get('total'))) * 100
    }));
  }

  static async getUserEngagement(userId, days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const engagement = await Notification.findAll({
      where: {
        userId,
        createdAt: { [Op.gte]: cutoffDate }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [
          sequelize.fn(
            'SUM',
            sequelize.literal("CASE WHEN status = 'read' THEN 1 ELSE 0 END")
          ),
          'read'
        ]
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))]
    });

    return engagement.map(day => ({
      date: day.get('date'),
      total: parseInt(day.get('total')),
      read: parseInt(day.get('read')),
      engagement: (parseInt(day.get('read')) / parseInt(day.get('total'))) * 100
    }));
  }
}

module.exports = NotificationAnalyticsService;