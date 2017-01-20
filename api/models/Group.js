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
    priority: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      required: true
    },
    hosts: {
      collection: 'host',
      via: 'groups',
      dominant: true,
    },
    image: {
      model: 'Image'
    }
  }
};

