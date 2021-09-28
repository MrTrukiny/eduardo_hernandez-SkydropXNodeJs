module.exports = function makeBuildUser({ userSchema }) {
  return async function buildUser({ validationType, ...userData } = {}) {
    await userSchema[validationType].validateAsync(userData);

    const { id, company, email, first_name, last_name, url, text } = userData;
    return Object.freeze({
      getId: () => id,
      getCompany: () => company,
      getEmail: () => email,
      getFirstName: () => first_name,
      getLastName: () => last_name,
      getUrl: () => url,
      getText: () => text,
    });
  };
};
