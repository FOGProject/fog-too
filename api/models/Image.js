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
    writeLock: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    readers: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      required: true
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
