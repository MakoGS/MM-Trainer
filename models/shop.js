'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  location: {
    address: String,
    city: String,
    required: true
  },
  type:{
    type: String,
    enum: ['Health/Nature Shop', 'Sports Nutrition', 'Meal prepared delivery'],
    required: true
  },
  contact:{
    email: String,
    phone: String,
    website: String,
    required: true
    }
});

module.exports = mongoose.model('Shop', schema);
