/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var _ = require('lodash'); // Force an upgrade of the lodash module as sails runs v3, and we need v4 api
var bcrypt = require('bcryptjs');
var hashPassword = function(password, next) {
  bcrypt.hash(password, sails.config.auth.bcrypt.rounds, function(err, hash) {
    if (err) return next(err);
    next(null, hash);
  });
};

var concatRoles = function(roles) {
  if(roles === undefined || roles.length == 0) return {};
  var permissions = {};
  for(var i = 0; i < roles.length; i++) {
    permissions = _.mergeWith(permissions, roles[i].permissions, function(objValue, srcValue) {
      return (objValue) ? objValue : srcValue;
    });
  }

  return permissions;
}

module.exports = {
  attributes: {
    username: {
      type: 'string',
      alphanumeric: true,
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
    roles: {
      collection: 'Role',
      via: 'users'
    },
    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      user.permissions = concatRoles(user.roles);
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