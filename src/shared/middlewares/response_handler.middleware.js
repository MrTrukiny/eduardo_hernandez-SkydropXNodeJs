module.exports = function responseHandlerMiddleware(req, res, next) {
  const {
    locals: { response },
  } = { ...res };
  if (response) {
    const { headers, statusCode, body } = response;
    if (headers) {
      res.set(response.headers);
    }
    if (!statusCode || !body) {
      return next(new Error());
    }
    // With this line we send responses in different languages.
    if (body.message) {
      body.message = req.t(body.message);
    }
    res.status(response.statusCode).json(response.body);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
  return next();
};
