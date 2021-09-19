module.exports = function errorHandlerMiddleware(error, req, res, next) {
  // TODO: Error logging
  console.error('Error:', error);

  res.status(error.statusCode || 500).json({
    error: error.message || 'An unknown error ocurred',
  });
};
