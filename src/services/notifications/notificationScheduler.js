const { Notification, User, NotificationPreference } = require('../../models');
const NotificationDispatcher = require('./notificationDispatcher');
const { calculateExpiryNotificationDate } = require('../../utils/notificationUtils');

class NotificationScheduler {
  static async scheduleNotification(notification) {
    if (!notification.scheduledFor) {
      return notification;
    }

    const scheduledTime = new Date(notification.scheduledFor).getTime();
    const now = Date.now();
    const delay = scheduledTime - now;

    if (delay <= 0) {
      return notification;
    }

    setTimeout(async () => {
      try {
        const [updatedNotification, user, preferences] = await Promise.all([
          Notification.findByPk(notification.id),
          User.findByPk(notification.userId),
          NotificationPreference.findOne({ where: { userId: notification.userId } })
        ]);

        if (updatedNotification && !updatedNotification.readAt && user && preferences) {
          await NotificationDispatcher.dispatch(updatedNotification, user, preferences);
        }
      } catch (error) {
        console.error('Failed to process scheduled notification:', error);
      }
    }, delay);

    return notification;
  }

  static async scheduleMembershipExpiryNotification(userMembership) {
    const notificationDate = calculateExpiryNotificationDate(userMembership.endDate);
    
    if (notificationDate <= new Date()) {
      return;
    }

    return this.scheduleNotification({
      userId: userMembership.userId,
      type: 'membership_expiry',
      scheduledFor: notificationDate,
      metadata: {
        membershipId: userMembership.membershipId,
        expiryDate: userMembership.endDate
      }
    });
  }
}

module.exports = NotificationScheduler;