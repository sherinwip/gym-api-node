const Joi = require('joi');

const paymentSchema = Joi.object({
  membershipId: Joi.string().uuid().required(),
  amount: Joi.number().positive().required(),
  paymentMethod: Joi.string().valid('cash', 'card', 'bank_transfer').required(),
  notes: Joi.string()
});

const validatePayment = async (data) => {
  return await paymentSchema.validateAsync(data);
};

module.exports = {
  validatePayment
};