const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users/:userId', async (req, res) => {
  res.status(201).send({ message: 'User created successfully!'});
});

module.exports = app;
