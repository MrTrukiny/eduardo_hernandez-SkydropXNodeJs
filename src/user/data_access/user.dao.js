const sequelize = require('../../config/database');

module.exports = function makeUserDAO({ User, setPagination }) {
  return Object.freeze({
    save,
    findById,
    update,
    erase,
    findAll,
  });

  async function save({ ...userData }) {
    try {
      const user = await User.create({ ...userData });

      // Restart sequence for preventing error with duplicate Ids.
      const maxUserId = await User.max('id');
      if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
        await sequelize.query(
          `ALTER SEQUENCE users_id_seq RESTART WITH ${Number(maxUserId)}`,
        );
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function findById({ userId }) {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      return user.dataValues;
    }
  }

  async function update({ userId, ...userData }) {
    return User.update(
      { ...userData },
      {
        where: { id: userId },
      },
    );
  }

  async function erase({ userId }) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    await user.destroy();
  }

  async function findAll({ order, page, size, sort_by, userIds }) {
    const usersWithCount = await User.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: size,
      offset: (page - 1) * size,
      order: [[sort_by, order]],
      where: userIds
        ? {
            id: userIds,
          }
        : undefined,
    });

    const { pagination } = setPagination({
      page,
      size,
      totalCount: usersWithCount.count,
    });

    return {
      pagination,
      data: usersWithCount.rows,
    };
  }
};
