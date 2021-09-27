module.exports = function makePendingUserDAO({ PendingUser }) {
  return Object.freeze({
    save,
    findById,
    erase,
    update,
    findAll,
  });

  async function save({ ...userData }) {
    return PendingUser.create({ ...userData });
  }

  async function findById({ userId }) {
    const user = await PendingUser.findOne({ where: { id: userId } });
    if (user) {
      return user.dataValues;
    }
  }

  async function erase({ userId }) {
    const user = await PendingUser.findOne({ where: { id: userId } });
    await user.destroy();
  }

  async function update({ userId, ...userData }) {
    return PendingUser.update(
      { ...userData },
      {
        where: { id: userId },
      },
    );
  }

  async function findAll() {
    return PendingUser.findAll({});
  }
};
