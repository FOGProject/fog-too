/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    optional: {
      type: 'boolean',
      defaultsTo: false
    },
    wait: {
      type: 'boolean',
      defaultsTo: true
    },
    action: {
      type: 'function'
    },
    payload: {
      type: 'json'
    },
    runner: {
      type: 'string',
      defaultsTo: 'server'
    },
    event: {
      type: 'string'
    },
    progress: {
      type: 'float',
      defaultsTo: 0
    },
    progressText: {
      type: 'string'
    },
    startTime: {
      type: 'datetime'
    },   
    completionTime: {
      type: 'datetime'
    },
    state: {
      type: 'string'
    },
    workflow: {
      model: 'Workflow'
    },
  }
};

