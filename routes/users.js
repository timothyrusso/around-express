const router = require('express').Router();
const { getUsers, getProfile, createUser, updateProfile } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getProfile);

router.post('/users', createUser);

router.patch('/users/me', updateProfile);

module.exports = router;
