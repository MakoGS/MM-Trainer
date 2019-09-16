'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true 
  },
  genre: {
    type: String,
    required: true,
    lowercase: true,
    enum: [ 'female', 'male' ]
  },
  skills: {    
    type: [String],
    required: true,
    lowercase: true,
    sparse: true,
    enum: [ 'nutrition', 'lose weight', 'increase strength', 'hypertrophy', 'performance', 'rehab', 'cutting' ]
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    trim: true    
  },
  location: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,    
  },
  image: {
    type: String,
    lowercase: true,
    trim: true,    
  },
  role: {
    type: String,
    required: true,
    enum: [ 'client', 'personalTrainer', 'admin' ],
    default: 'user'
  },
  passwordHash: {
    type: String,
    required: true
  }
});

//---THIS CONFIGURATION WILL BE ENABLED AFTER CONFIGURATING PASSPORT
const logInStatic = require('./statics/login-static');
const signUpStatic = require('./statics/sign-up-static');

schema.statics.logIn = logInStatic;
schema.statics.signUp = signUpStatic;

const User = mongoose.model('User', schema);

module.exports = User;
