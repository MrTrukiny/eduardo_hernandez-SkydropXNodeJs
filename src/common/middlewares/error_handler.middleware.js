module.exports = function errorHandlerMiddleware(error, req, res, next) {
  // TODO: Error logging
  console.error('Error Handler:', error);

  const { message } = error;

  let validationMessage;
  if (message.startsWith('ValidationError:')) {
    validationMessage = message.split(' ')[1];
  }
  if (message.startsWith('USER_ALREADY_EXISTS')) {
    validationMessage = message.split(' ')[0];
  }

  res.status(error.statusCode || 500).json({
    error: validationMessage || error.message || 'An unknown error ocurred',
  });
};
