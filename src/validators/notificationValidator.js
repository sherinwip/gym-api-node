const Joi = require('joi');

const notificationSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  type: Joi.string().valid(
    'membership_expiry',
    'class_reminder',
    'payment_confirmation',
    'system_announcement'
  ).required(),
  title: Joi.string().required(),
  message: Joi.string().required(),
  metadata: Joi.object(),
  scheduledFor: Joi.date()
});

const preferencesSchema = Joi.object({
  emailEnabled: Joi.boolean(),
  pushEnabled: Joi.boolean(),
  membershipAlerts: Joi.boolean(),
  classReminders: Joi.boolean(),
  paymentAlerts: Joi.boolean()
});

const validateNotification = async (data) => {
  return await notificationSchema.validateAsync(data);
};

const validatePreferences = async (data) => {
  return await preferencesSchema.validateAsync(data);
};

module.exports = {
  validateNotification,
  validatePreferences
};