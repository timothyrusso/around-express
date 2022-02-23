const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) =>
  getDataFromFile(dataPath)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));

const getProfile = (req, res) =>
  getDataFromFile(dataPath)
    .then((users) => users.find((user) => user._id == req.params.id))
    .then((user) => {
      if (!isNaN(req.params.id)) {
        return res
          .status(400)
          .send({ message: 'The user id must be a string' });
      }
      if (!user) {
        return res.status(404).send({
          message: `There is no user with the id ${req.params.id}`
        })
      }

      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err));

module.exports = { getUsers, getProfile };