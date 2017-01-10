/**
 * Task.js
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
    runner: {
      type: 'string',
      defaultsTo: 'server',
      required: true
    },
    subRunner: {
      type: 'string'
    },
    state: {
      type: 'integer',
      defaultsTo: 0,
      required: true
    },    
    payload: {
      type: 'json',
      required: true
    },
    workflow: {
      model: 'Workflow',
      required: true
    },
    progress: {
      type: 'float',
      defaultsTo: 0,
      required: true
    },
    progressText: {
      type: 'string',
      defaultsTo: '',
      required: true
    },
    startTime: {
      type: 'datetime'
    },   
    completionTime: {
      type: 'datetime'
    },
  }
};

