'use strict';
const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        callback(new Error('MISSING_USER'));
      } else {
        callback(null, user);
      }
    })
    .catch(err => {
      callback(err);
    });
});

passport.use('sign-in', new PassportLocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
  User.signIn(email, password)
    .then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err);
    });
}));

passport.use('sign-up', new PassportLocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
  User.signUp(email, password)
    .then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err);
    });
}));