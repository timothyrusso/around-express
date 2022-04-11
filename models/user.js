const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    required: [true, 'url required'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'This field must be a link.',
    },
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'This field must be an email.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
});

module.exports = mongoose.model('user', userSchema);
