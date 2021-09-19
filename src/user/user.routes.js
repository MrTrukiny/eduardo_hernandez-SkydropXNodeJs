const express = require('express');

const customExpressCallback = require('../common/utils/custom_express_callback');
const { postUser } = require('./controllers');

const router = express.Router();

router.post('/api/1.0/users/:userId?', customExpressCallback(postUser));

module.exports = router;
