const { sendEmail } = require('../../utils/emailUtils');

class EmailNotificationService {
  static async send(user, notification) {
    return await sendEmail({
      to: user.email,
      subject: notification.title,
      text: notification.message
    });
  }
}

module.exports = EmailNotificationService;