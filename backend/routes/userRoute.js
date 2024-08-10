const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    res.send('Get all users');
});

module.exports = router;
