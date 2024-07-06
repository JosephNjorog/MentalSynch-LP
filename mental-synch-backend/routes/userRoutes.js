const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   GET api/users/me
// @desc    Get current user
router.get('/me', auth, userController.getCurrentUser);

// @route   PUT api/users/me
// @desc    Update current user
router.put('/me', auth, userController.updateUser);

module.exports = router;
