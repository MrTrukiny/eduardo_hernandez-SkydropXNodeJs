module.exports = function makeRemoveUser({ eraseUser }) {
  return async function removeUser({ userId }) {
    return eraseUser({
      userId,
    });
  };
};
