module.exports = function responseHandlerMiddleware(req, res, next) {
  const {
    locals: { response },
  } = { ...res };
  if (response) {
    if (response.headers) {
      res.set(response.headers);
    }
    if (!response.statusCode || !response.body) {
      return next(new Error());
    }
    res.status(response.statusCode).json(response.body);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
  return next();
};
