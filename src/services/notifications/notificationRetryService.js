const notificationQueue = require('./notificationQueue');

class NotificationRetryService {
  static MAX_RETRIES = 3;
  static RETRY_DELAYS = [1000, 5000, 15000]; // Increasing delays in milliseconds

  static async retryNotification(notification, service, user, retryCount = 0) {
    try {
      await service.send(user, notification);
      notificationQueue.remove(notification.id);
    } catch (error) {
      if (retryCount < this.MAX_RETRIES) {
        const delay = this.RETRY_DELAYS[retryCount];
        
        setTimeout(() => {
          this.retryNotification(notification, service, user, retryCount + 1);
        }, delay);
      } else {
        console.error(`Failed to send notification after ${this.MAX_RETRIES} retries:`, {
          notificationId: notification.id,
          userId: user.id,
          error: error.message
        });
        notificationQueue.remove(notification.id);
      }
    }
  }
}

module.exports = NotificationRetryService;