const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json()); // application/json
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.errors || ['Server error'];

  res.status(status).json({ message: message, errors: errors });
});

mongoose
  .connect(
    'mongodb+srv://regi:NvkgD3Hok1E4F46I@cluster0.n7bqv.mongodb.net/messages?retryWrites=true&w=majority'
  )
  .then((result) => {
    app.listen(8000);
  })
  .catch((error) => console.log(error));
