'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    trim: true 
  },
  genre: {
    type: String,    
    lowercase: true,
    enum: [ 'female', 'male' ]
  },
  skills: {    
    type: [String],
    required: true,
    // lowercase: true,
    sparse: true,
    enum: [ 'Nutrition', 'Loose weight', 'Increase strength', 'Hypertrophy', 'Performance', 'Rehab', 'Cutting' ]
  },
  description: {
    type: String,    
    lowercase: true,
    trim: true    
  },
  location: {
    type: String,    
    lowercase: true,
    trim: true  
  },
  image: {
    type: String,    
    trim: true,
    required: true,
    default: './../images/profile.png'
  },
  role: {
    type: String,
    required: true,
    enum: [ 'client', 'personalTrainer', 'admin' ]
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
