const express = require('express');
const app = express();
const usersRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')

const { PORT = 3000 } = process.env;

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use((req, res, next) => {
  res.status(404).send({ message: 'Requested resource not found' })
});

app.listen(PORT, () => {
  console.log('The server is started');
});