// Libs
const express = require('express');
const i18next = require('./shared/middlewares/internationalization_handler.middleware');

// Routes
const userRoutes = require('./user/user.routes');

// Import Middlewares
const i18nHttpMiddleware = require('i18next-http-middleware');
const errorHandlerMiddleware = require('./shared/middlewares/error_handler.middleware');
const responseHandlerMiddleware = require('./shared/middlewares/response_handler.middleware');

// Initialize Express App
const app = express();

// Use Middleware: internationalization
app.use(i18nHttpMiddleware.handle(i18next));

// Use Middlewares: body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(userRoutes);

// Use Middlewares: custom error and response
app.use(responseHandlerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
