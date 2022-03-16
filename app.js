const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { NOT_FOUND } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;
const limiter = rateLimit({ // Limit repeated requests to public APIs and/or endpoints
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(limiter);

app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '622ed7d40a0ec70d1d60d89e'
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
});
