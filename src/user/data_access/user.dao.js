module.exports = function makeUserDAO({ User }) {
  return Object.freeze({
    save,
    findById,
    update,
  });

  async function save({ ...userData }) {
    return User.create({ ...userData });
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
};
