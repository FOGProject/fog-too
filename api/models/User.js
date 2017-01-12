/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
var hashPassword = function(password, next) {
  bcrypt.hash(password, sails.config.auth.bcrypt.rounds, function(err, hash) {
    if (err) return next(err);
    next(null, hash);
  });
};

module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8
    },
    role: {
      model: 'Role'
    },

    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      return user;
    },
    comparePassword: function(candidatePassword, next) {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
      });
    }, 
  },
  beforeCreate: function (values, next) {
    hashPassword(values.password, function(err, hash) {
      if (err) return next(err);
      values.password = hash;
      next();
    });
  },
  beforeUpdate: function (values, next) {
    if(!values.hasOwnProperty('password')) return next();
    hashPassword(values.password, function(err, hash) {
      if (err) return next(err);
      values.password = hash;
      next();
    });
  }
};