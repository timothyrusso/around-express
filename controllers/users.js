const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(err => res.status(500).send({ message: `An error has occurred on the server: ${err}` }));

const getProfile = (req, res) => {
  const { id } = req.params;
  User.findOne({ id })
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => { res.status(200).send({ data: user }) })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Invalid data: ${err}` })
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message })
      } else {
        res.status(500).send({ message: `An error has occurred on the server: ${err}` })
      }
    });
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((errors) => errors.message).join(', ')}` })
      } else {
        res.status(500).send({ message: `An error has occurred on the server: ${err}` })
      }
    });
}

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true // // the data will be validated before the update
    }
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => { res.status(200).send({ data: user }) })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Invalid data: ${err}` })
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message })
      } else {
        res.status(500).send({ message: `An error has occurred on the server: ${err}` })
      }
    });
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => { res.status(200).send({ data: user }) })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Invalid data: ${err}` })
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message })
      } else {
        res.status(500).send({ message: `An error has occurred on the server: ${err}` })
      }
    });
}

module.exports = { getUsers, getProfile, createUser, updateProfile, updateAvatar };
