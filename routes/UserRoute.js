const express = require('express');
const { registerUser, loginUser, currentUser, logoutUser } = require('../controller/UserController');
const router = express.Router();
// register
// login
//current

router.post ('/register', registerUser);

router.post ('/login', loginUser);

router.get ('/current', currentUser);

router.post ('/logout', logoutUser);

module.exports = router;