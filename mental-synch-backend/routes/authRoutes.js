const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Register new user
router.post('/register', authController.register);

// @route   POST api/auth/login
// @desc    Login user
router.post('/login', authController.login);

// @route   GET api/auth/google
// @desc    Authenticate with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @route   GET api/auth/google/callback
// @desc    Google auth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback);

// @route   GET api/auth/facebook
// @desc    Authenticate with Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// @route   GET api/auth/facebook/callback
// @desc    Facebook auth callback
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), authController.facebookCallback);

module.exports = router;
