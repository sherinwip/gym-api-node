// Placeholder for push notification service integration
const sendPushNotification = async ({ userId, title, body, data }) => {
  // In production, integrate with a push notification service
  console.log('Sending push notification:', { userId, title, body, data });
  return Promise.resolve();
};

module.exports = {
  sendPushNotification
};