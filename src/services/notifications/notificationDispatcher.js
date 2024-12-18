const NotificationFactory = require('./notificationFactory');
const NotificationRetryService = require('./notificationRetryService');
const notificationQueue = require('./notificationQueue');
const { shouldSendNotification } = require('../../utils/notificationUtils');

class NotificationDispatcher {
  static async dispatch(notification, user, preferences) {
    if (!shouldSendNotification(preferences, notification.type)) {
      return;
    }

    const services = NotificationFactory.getNotificationServices(preferences);
    notificationQueue.add(notification);
    
    const dispatchPromises = services.map(service => 
      NotificationRetryService.retryNotification(notification, service, user)
    );
    
    return Promise.all(dispatchPromises);
  }
}

module.exports = NotificationDispatcher;