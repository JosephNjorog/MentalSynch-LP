const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth/google', userController.googleLogin);
router.get('/auth/google/callback', userController.googleCallback);
router.get('/auth/facebook', userController.facebookLogin);
router.get('/auth/facebook/callback', userController.facebookCallback);

module.exports = router;
