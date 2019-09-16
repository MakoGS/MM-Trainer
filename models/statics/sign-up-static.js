'use strict';

const bcrypt = require('bcryptjs');

module.exports = function(
  email, 
  password, 
  name, 
  dateOfBirth, 
  genre, 
  skills, 
  description, 
  location, 
  image, 
  role
) {
  
  const Model = this; 

  return bcrypt.hash(password, 10)
    .then(hash => {
      return Model.create({
        name,
        email,
        dateOfBirth,
        genre,
        skills,
        description,
        location,
        image,
        role,
        passwordHash: hash
      });
    })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      console.log(error);
      return Promise.reject(new Error('There was an error in the sign up process.'));
    });
};
