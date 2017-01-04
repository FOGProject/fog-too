/**
 * Image.js
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
    directory: {
      type: 'string'
    },
    writeLock: {
      type: 'boolean',
      defaultsTo: false
    },
    readers: {
      type: 'integer',
      defaultsTo: 0
    },
    hosts: {
      collection: 'Host',
      via: 'image'
    },
    groups: {
      collection: 'Group',
      via: 'image'
    }
  }
};
