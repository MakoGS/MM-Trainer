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
    unique: true,
    enum: [ 'female', 'male' ]
  },
  skills: {
    type: String,
    required: true,
    lowercase: true,
    enum: [ 'nutrition', 'loose weight', 'increase strength', 'hypertrophy', 'performance', 'rehab', 'cutting' ],
    unique: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  location: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
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
// const signInStatic = require('./user-sign-in-static');
// const signUpStatic = require('./user-sign-up-static');

// schema.statics.signIn = signInStatic;
// schema.statics.signUp = signUpStatic;

const Client = mongoose.model('Client', schema);

module.exports = Client;
