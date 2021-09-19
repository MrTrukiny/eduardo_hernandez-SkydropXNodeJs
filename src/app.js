const express = require('express');
const app = express();
const User = require('./users/user.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users/:userId', async (req, res) => {
  await User.create(req.body);
  res.status(201).send({ message: 'User created successfully!' });
});

module.exports = app;
