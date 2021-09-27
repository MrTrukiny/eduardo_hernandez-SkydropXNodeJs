const axios = require('axios');

const ErrorResponse = require('../utils/custom_error');

const axiosHandler = Object.freeze({
  async request({ ...options }) {
    try {
      const instance = axios.create();
      const { data } = await instance(options);
      return { ...data };
    } catch (error) {
      const { response } = error;
      throw new ErrorResponse(
        response?.data || 'Unknown Request Error',
        response?.status || 500,
      );
    }
  },
});

module.exports = axiosHandler;
