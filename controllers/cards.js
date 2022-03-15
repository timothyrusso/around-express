const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(err => res.status(500).send({ message: `An error has occurred on the server: ${err}` }));

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(err => res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      }
      res.status(200).send({ data: card });
    })
    .catch(err => res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      }
      res.status(200).send({ data: card });
    })
    .catch(err => res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Card not found' });
      }
      res.status(200).send({ data: card });
    })
    .catch(err => res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
