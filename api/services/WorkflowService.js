module.exports = {
  createWorkflow: function(hostId, baseAction) {
      BusService.publish('workflow.create', hostId);
  },
  cancelWorkflow: function(id) {
      BusService.publish('workflow.cancel', id);
  },
  findAllWorkflows: function(hostId) {
     Workflow.find({host: hostId}).exec(function(err, workflow) {
      if(err) throw err;
      next(workflow);
    });  
  },
  findWorkflows: function(hostId, state) {
     Workflow.find([{host: hostId}, {state: state}]).exec(function(err, workflow) {
      if(err) throw err;
      next(workflow);
    });   
  },
  getWorkflows: function() {
    Workflow.find().exec(function(err, workflows) {
      if(err) throw err;
      next(workflows);
    });
  },
  registerTaskFactory: function(topic, taskFactory) {

  },
  unregisterTaskFactory: function(topic, taskFactory) {

  }
};