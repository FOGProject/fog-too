/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var flatten = require('flat');

var filterPermissions = function(permissions) {
  if (!permissions) permissions = {};

  var toValidate = flatten(permissions);

  // Filter out unknown permissions
  for(var i = 0; i < toValidate.length; i++) {
    if(!_.get(sails.config.permissions, toValidate[i]))
      _.set(permissions, toValidate[i], undefined);
  }

  // Merge in the default permissions, ensuring all values are set
  // Note that the 'right' object being merged overrides any values set
  // by the 'left' object
  return _.merge(sails.config.permissions, permissions);
}

var deepMap = function(obj, cb) {
    var out = {};

    Object.keys(obj).forEach(function (k) {
      var val;

      if (obj[k] !== null && typeof obj[k] === 'object') {
        val = deepMap(obj[k], cb);
      } else {
        val = cb(obj[k], k);
      }

      out[k] = val;
    });

  return out;
}

module.exports = {
  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    users: {
      collection: 'User',
      via: 'roles',
      dominant: true
    },
    isAdmin: {
      type: 'boolean',
      required: true,
      defaultsTo: false,
    },
    permissions: { 
      type: 'json',
      required: true,
    },
  },
  beforeCreate: function (values, next) {
    if (values.isAdmin) {
      values.permissions = deepMap(sails.config.permissions, function (v, k) { return true; });
    }
    else {
      values.permissions = filterPermissions(values.permissions);
    }
    
    next();
  },
  beforeUpdate: function (values, next) {
    if(values.hasOwnProperty('permissions') && !values.isAdmin)
      values.permissions = filterPermissions(values.permissions);
    else if(values.isAdmin)
      values.permissions = deepMap(sails.config.permissions, function (v, k) { return true; });

    next();
  }
};

