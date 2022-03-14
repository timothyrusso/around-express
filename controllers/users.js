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
    .then((users) => res.status(201).send(users))
    .catch((err) => res.status(500).send(err));
}

module.exports = { getUsers, getProfile, createUser };
