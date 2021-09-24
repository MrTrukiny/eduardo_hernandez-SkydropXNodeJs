const express = require('express');
const app = express();

const userRoutes = require('./user/user.routes');

// Middlewares
const errorHandlerMiddleware = require('./common/middlewares/error_handler.middleware');
const responseHandlerMiddleware = require('./common/middlewares/response_handler.middleware');

// Middlewares: body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRoutes);

// Middlewares: custom error and response
app.use(responseHandlerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
