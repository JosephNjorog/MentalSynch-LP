// controllers/userController.js

const User = require('../models/User');
const passport = require('passport');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email });
        await User.register(user, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
};

exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/'
});

exports.facebookLogin = passport.authenticate('facebook', { scope: ['email'] });

exports.facebookCallback = passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/'
});
const User = require('../models/User');

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
