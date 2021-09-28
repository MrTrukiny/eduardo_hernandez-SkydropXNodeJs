const { ValidationError } = require('joi');
const ErrorResponse = require('../utils/custom_error');

module.exports = function errorHandlerMiddleware(error, req, res, next) {
  // TODO: Error logging
  console.error('Error Handler:', error);

  const { message } = error;

  if (error instanceof ValidationError) {
    error = new ErrorResponse(message, 400);
  }
  if (message.startsWith('ValidationError:')) {
    error = new ErrorResponse(message.split(' ')[1], 404);
  }
  if (message.startsWith('USER_ALREADY_EXISTS')) {
    error.message = message.split(' ')[0];
  }

  res.status(error.statusCode || 500).json({
    error: (error.message && req.t(error.message)) || req.t('UNKNOWN_ERROR'),
  });
};
