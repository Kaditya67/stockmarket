const express = require('express');
const { registerUser, loginUser, getCurrentUser, logoutUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', getCurrentUser);
router.post('/logout', logoutUser);

module.exports = router;
