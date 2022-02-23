const express = require('express');
const app = express();
const usersRouter = require('./routes/users')

const { PORT = 3000 } = process.env;

app.use('/', usersRouter)

app.listen(PORT, () => {
  console.log('The server is started');
});