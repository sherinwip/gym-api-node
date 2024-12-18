const { addDays } = require('./dateUtils');

const NOTIFICATION_TYPES = {
  MEMBERSHIP_EXPIRY: 'membership_expiry',
  CLASS_REMINDER: 'class_reminder',
  PAYMENT_CONFIRMATION: 'payment_confirmation',
  SYSTEM_ANNOUNCEMENT: 'system_announcement'
};

const generateNotificationContent = (type, data) => {
  const templates = {
    [NOTIFICATION_TYPES.MEMBERSHIP_EXPIRY]: {
      title: 'Membership Expiring Soon',
      message: `Your ${data.membershipType} membership will expire on ${data.expiryDate}.`
    },
    [NOTIFICATION_TYPES.CLASS_REMINDER]: {
      title: 'Upcoming Class Reminder',
      message: `Your ${data.className} class with ${data.trainerName} starts at ${data.startTime}.`
    },
    [NOTIFICATION_TYPES.PAYMENT_CONFIRMATION]: {
      title: 'Payment Confirmation',
      message: `Payment of ${data.amount} for ${data.membershipType} membership was successful.`
    },
    [NOTIFICATION_TYPES.SYSTEM_ANNOUNCEMENT]: {
      title: data.title,
      message: data.message
    }
  };

  return templates[type] || {
    title: 'Notification',
    message: 'You have a new notification.'
  };
};

const shouldSendNotification = (preferences, type) => {
  const mappings = {
    [NOTIFICATION_TYPES.MEMBERSHIP_EXPIRY]: 'membershipAlerts',
    [NOTIFICATION_TYPES.CLASS_REMINDER]: 'classReminders',
    [NOTIFICATION_TYPES.PAYMENT_CONFIRMATION]: 'paymentAlerts'
  };

  const preferenceKey = mappings[type];
  return !preferenceKey || preferences[preferenceKey];
};

const calculateExpiryNotificationDate = (expiryDate, daysBeforeExpiry = 7) => {
  const notificationDate = new Date(expiryDate);
  notificationDate.setDate(notificationDate.getDate() - daysBeforeExpiry);
  return notificationDate;
};

module.exports = {
  NOTIFICATION_TYPES,
  generateNotificationContent,
  shouldSendNotification,
  calculateExpiryNotificationDate
};