module.exports = function makeUserDAO({ User }) {
  return Object.freeze({
    save,
  });

  async function save({ ...userData }) {
    return User.create({ ...userData });
  }
};
