const express = require('express');

const customExpressCallback = require('../common/utils/custom_express_callback');
const { postUser, putUser } = require('./controllers');

const router = express.Router();

router.post('/api/1.0/users/:userId?', customExpressCallback(postUser));

router.put('/api/1.0/users/:userId', customExpressCallback(putUser));

module.exports = router;
