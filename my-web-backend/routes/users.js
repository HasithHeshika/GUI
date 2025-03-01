const express = require('express');
const { getUsers, addUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);
router.post('/login', loginUser);

module.exports = router;
