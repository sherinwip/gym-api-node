const Joi = require('joi');

const classSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  capacity: Joi.number().integer().min(1).required(),
  trainerId: Joi.string().uuid().required()
});

const validateClass = async (data) => {
  return await classSchema.validateAsync(data);
};

module.exports = {
  validateClass
};