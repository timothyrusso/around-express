const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err));

const getProfile = (req, res) => User.findById(req.params.id)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: 'User ID not found',
      });
    }

    return res.status(200).send(user);
  })
  .catch((err) => res.status(500).send(err));

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => res.status(201).send({ data: users }))
    .catch((err) => res.status(500).send(err));
}

module.exports = { getUsers, getProfile, createUser };
