const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(err => res.status(500).send({ message: `An error has occurred on the server: ${err}` }));

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((errors) => errors.message).join(', ')}` })
      } else {
        res.status(500).send({ message: `An error has occurred on the server: ${err}` })
      }
    })
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => { res.status(200).send({ data: card }) })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: `Invalid data: ${err}` })
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: `Id not found: ${err}` })
      } else {
        res.status(500).send({ message: `An error has occurred on the server: ${err}` })
      }
    })
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => { res.status(200).send({ data: card }) })
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

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => { res.status(200).send({ data: card }) })
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

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
