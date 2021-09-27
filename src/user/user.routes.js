const express = require('express');

// Middlewares
const pagination = require('../shared/middlewares/pagination_handler.middleware');

// Controllers
const { postUser, putUser, deleteUser, getUsers } = require('./controllers');

// Utils
const customExpressCallback = require('../shared/utils/custom_express_callback');

const router = express.Router();

router.post('/api/1.0/users/:userId?', customExpressCallback(postUser));

router.put('/api/1.0/users/:userId', customExpressCallback(putUser));

router.delete('/api/1.0/users/:userId', customExpressCallback(deleteUser));

router.get('/api/1.0/users/:userIds?', pagination, customExpressCallback(getUsers));

module.exports = router;
