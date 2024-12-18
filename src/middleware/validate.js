const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      req.body = validated;
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }
  };
};

module.exports = { validate };