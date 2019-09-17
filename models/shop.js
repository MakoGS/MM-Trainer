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
    address: {
      type:String,
      lowercase:true,
      trim:true
    },
    city: {
      type: String,
      lowercase: true,
      trim: true
    }
  },
  type:{
    type: String,
    enum: ['Health/Nature Shop', 'Sports Nutrition', 'Meal prepared delivery'],
    required: true,
    trim: true,
    lowercase:true
  },
  contact:{
    email: {
      type:String,
      lowercase:true,
      trim: true
    },
    phone: {
      type:String,
      trim:true,
      lowercase:true
    },
    website: {
      type: String,
      trim:true,
      lowercase:true
    }
    }
});

module.exports = mongoose.model('Shop', schema);
