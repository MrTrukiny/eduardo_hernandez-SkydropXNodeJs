module.exports = class ErrorResponse extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};
