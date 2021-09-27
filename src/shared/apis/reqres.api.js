const axiosHandler = require('../libs/axios_handler');

const reqresAPI = Object.freeze({
  getUser: async (userId) => {
    const requestOptions = {
      method: 'GET',
      url: `https://reqres.in/api/users/${userId}`,
      timeout: 5000,
    };

    const user = await axiosHandler.request({ ...requestOptions });
    return user;
  },
});

module.exports = reqresAPI;
