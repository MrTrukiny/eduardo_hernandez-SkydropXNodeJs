module.exports = function makeCreateUser({ buildUser, saveUser }) {
  return async function createUser({ ...userData }) {
    const user = buildUser({ ...userData });
    return saveUser({
      company: user.getCompany(),
      email: user.getEmail(),
      first_name: user.getFirstName(),
      last_name: user.getLastName(),
      url: user.getUrl(),
      text: user.getText(),
    });
  };
};
