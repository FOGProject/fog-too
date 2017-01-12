/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    users: {
      collection: 'User',
      via: 'role',
      required: true,
      defaultsTo: []
    },
    permissions: {
      type: 'array',
      required: true,
      defaultsTo: []
    }
  }
};

