const Joi = require('joi');
const { userDAO } = require('./data_access');
const ErrorResponse = require('../shared/utils/custom_error');

/**
 * Regular Expression for URL validation.
 * @see https://gist.github.com/dperini/729294
 */
const validUrl = new RegExp(
  '^' +
    // protocol identifier (optional)
    // short syntax // still required
    '(?:(?:(?:https?|ftp):)?\\/\\/)' +
    // user:pass BasicAuth (optional)
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion
    // private & local networks
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    '(?:' +
    '(?:' +
    '[a-z0-9\\u00a1-\\uffff]' +
    '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
    ')?' +
    '[a-z0-9\\u00a1-\\uffff]\\.' +
    ')+' +
    // TLD identifier name, may end with dot
    '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
    ')' +
    // port number (optional)
    '(?::\\d{2,5})?' +
    // resource path (optional)
    '(?:[/?#]\\S*)?' +
    '$',
  'i',
);

/**
 * Joi Schema for Create User data valitation.
 * @see https://joi.dev/api/#introduction
 */
const createUser = Joi.object({
  id: Joi.number()
    .external(async (id) => {
      if (id) {
        const user = await userDAO.findById({ userId: id });
        if (user) {
          throw new ErrorResponse('USER_ALREADY_EXISTS', 400);
        }
      }
    })
    .messages({
      'number.base': 'ID_INVALID',
      'number.unsafe': 'ID_SIZE',
    }),
  company: Joi.string().min(3).max(30).allow(''),
  email: Joi.string().email().required().messages({
    'string.email': 'EMAIL_INVALID',
    'any.required': 'EMAIL_REQUIRED',
  }),
  // I'm using snake_case (fist_name and last_name) for the field names in db because of the requirements. But I prefer to use camelCase.
  first_name: Joi.string().min(2).max(20).required().messages({
    'string.min': 'FIRST_NAME_SIZE',
    'string.max': 'FIRST_NAME_SIZE',
    'string.empty': 'FIRST_NAME_REQUIRED',
    'any.required': 'FIRST_NAME_REQUIRED',
  }),
  last_name: Joi.string().min(2).max(20).allow('').messages({
    'string.min': 'LAST_NAME_SIZE',
    'string.max': 'LAST_NAME_SIZE',
  }),
  url: Joi.string().regex(validUrl).message('URL_INVALID'),
  text: Joi.string().allow(''),
});

const updateUser = Joi.object({
  id: Joi.number().messages({
    'number.base': 'ID_INVALID',
    'number.unsafe': 'ID_SIZE',
  }),
  company: Joi.string().min(3).max(30).allow('', null),
  email: Joi.string().email().messages({
    'string.email': 'EMAIL_INVALID',
  }),
  // I'm using snake_case (fist_name and last_name) for the field names in db because of the requirements. But I prefer to use camelCase.
  first_name: Joi.string().min(2).max(20).messages({
    'string.min': 'FIRST_NAME_SIZE',
    'string.max': 'FIRST_NAME_SIZE',
    'string.empty': 'FIRST_NAME_REQUIRED',
  }),
  last_name: Joi.string().min(2).max(20).allow('').messages({
    'string.min': 'LAST_NAME_SIZE',
    'string.max': 'LAST_NAME_SIZE',
  }),
  url: Joi.string().regex(validUrl).message('URL_INVALID'),
  text: Joi.string().allow('', null),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

module.exports = { createUser, updateUser };
