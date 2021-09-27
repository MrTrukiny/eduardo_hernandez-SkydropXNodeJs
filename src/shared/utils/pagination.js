const setPagination = ({ page, size, totalCount }) => {
  const pagination = {};
  const pageSize = page * size;

  if (pageSize < totalCount) {
    pagination.next = {
      page: page + 1,
      perPage: size,
    };
  }

  if (pageSize > 1 && page > 1) {
    pagination.prev = {
      page: page - 1,
      perPage: size,
    };
  }

  return {
    pagination: {
      ...pagination,
      page,
      total: totalCount,
      totalPages: Math.ceil(totalCount / size),
    },
  };
};

module.exports = setPagination;
