const EmailNotificationService = require('./emailNotificationService');
const PushNotificationService = require('./pushNotificationService');

class NotificationFactory {
  static getNotificationServices(preferences) {
    const services = [];
    
    if (preferences.emailEnabled) {
      services.push(EmailNotificationService);
    }
    
    if (preferences.pushEnabled) {
      services.push(PushNotificationService);
    }
    
    return services;
  }
}

module.exports = NotificationFactory;