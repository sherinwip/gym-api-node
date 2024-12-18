const { sendPushNotification } = require('../../utils/pushNotificationUtils');

class PushNotificationService {
  static async send(user, notification) {
    return await sendPushNotification({
      userId: user.id,
      title: notification.title,
      body: notification.message,
      data: notification.metadata
    });
  }
}

module.exports = PushNotificationService;