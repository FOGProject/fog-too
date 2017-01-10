/**
 * Workflow.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    tasks: {
      collection: 'Task',
      via: 'workflow',
      defaultsTo: [],
      required: true
    },
    state: {
      type: 'integer',
      defaultsTo: 0,
      required: true
    },
    tasks: {
      collection: 'Task',
      via: 'workflow',
      defaultsTo: [],
      required: true
    },
    host: {
      model: 'Host'
    },
  }
};

