const router = require('express').Router();
const { getUsers, getProfile, createUser } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getProfile);

router.post('/users', createUser);

module.exports = router;
