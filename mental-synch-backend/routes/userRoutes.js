// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth/google', userController.googleLogin);
router.get('/auth/google/callback', userController.googleCallback);
router.get('/auth/facebook', userController.facebookLogin);
router.get('/auth/facebook/callback', userController.facebookCallback);

// @route   GET api/users/me
// @desc    Get current user
router.get('/me', auth, userController.getCurrentUser);

// @route   PUT api/users/me
// @desc    Update current user
router.put('/me', auth, userController.updateUser);

module.exports = router;
