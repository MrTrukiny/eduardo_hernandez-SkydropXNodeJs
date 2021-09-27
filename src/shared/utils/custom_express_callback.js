module.exports = function makeExpressCallback(controller) {
  return (req, res, next) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      file: req.file,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      pagination: req.pagination,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };
    const httpResponse = { ...res.locals };

    controller(httpRequest, httpResponse)
      .then((response) => {
        res.locals = response ? { ...res.locals, ...response } : res.locals;
        return next();
      })
      .catch(next);
  };
};
