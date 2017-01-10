module.exports = {
  get: function(id, next) {  
    Workflow.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    Workflow.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    Workflow.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(params, next) {
    Workflow.create(params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('workflow.create', result);
      next(null, result);
    });
  },
  update: function(id, params, next) {
    Workflow.update({id: id}, params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('workflow.update', result);
      next(null, result);
    });
  },  
  destroy: function(id, next) {
    Workflow.destroy({id: id}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('workflow.destroy', result);
      next(null, result);
    });
  }
};