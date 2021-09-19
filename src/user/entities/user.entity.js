module.exports = function makeBuildUser({}) {
  return function buildUser({ company, email, first_name, last_name, url, text } = {}) {
    return Object.freeze({
      getCompany: () => company,
      getEmail: () => email,
      getFirstName: () => first_name,
      getLastName: () => last_name,
      getUrl: () => url,
      getText: () => text,
    });
  };
};
