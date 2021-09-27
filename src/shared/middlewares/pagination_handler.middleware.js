const pagination = (req, res, next) => {
  let { page, size, sort_by, order } = req.query;
  page = page >= 1 ? Number(page) : 1;
  size = size >= 1 && size <= 10 ? Number(size) : 10;
  sort_by = sort_by ?? 'id';
  order = order ?? 'DESC';

  req.pagination = { page, size, sort_by, order };
  next();
};

module.exports = pagination;
