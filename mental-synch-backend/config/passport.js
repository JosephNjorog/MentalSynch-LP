const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
require('dotenv').config();

module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Password incorrect' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  }, async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }
      user = new User({ googleId: profile.id, name: profile.displayName, email: profile.emails[0].value });
      await user.save();
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
  }, async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (user) {
        return done(null, user);
      }
      user = new User({ facebookId: profile.id, name: profile.displayName, email: profile.emails[0].value });
      await user.save();
      done(null, user);
    } catch (err) {
      done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
