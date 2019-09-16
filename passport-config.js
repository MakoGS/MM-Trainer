'use strict';
const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const Client = require('./models/client');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  Client.findById(id)
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

passport.use('login', new PassportLocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
  Client.logIn(email, password)
    .then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err);
    });
}));

passport.use('sign-up', new PassportLocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, callback) => {
  console.log('sign up testing')
  Client.signUp(
    email,
    password,
    req.body.name,
    req.body.dateOfBirth,
    req.body.genre,
    req.body.skills,
    req.body.description,
    req.body.location,
    req.body.image,
    req.body.role
  )
    .then(user => {
      callback(null, user);
    })
    .catch(err => {
      callback(err);
    });
}));