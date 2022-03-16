const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes');
const { mongoDbAdress, limiter } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(mongoDbAdress, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(limiter);

app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '622ed7d40a0ec70d1d60d89e',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
