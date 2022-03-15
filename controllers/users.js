const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err));

const getProfile = (req, res) => {
  const { id } = req.params;
  User.findOne({ id })
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send(err));
}

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true // the data will be validated before the update
    }
  )
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    // pass the options object:
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true // the data will be validated before the update
    }
  )
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
}

module.exports = { getUsers, getProfile, createUser, updateProfile, updateAvatar };
