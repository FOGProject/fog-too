module.exports = {
  get: function(id, next) {  
    Task.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    Task.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    Task.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(params, next) {
    Task.create(params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('task.create', result);
      next(null, result);
    });
  },
  update: function(id, params, next) {
    Task.update({id: id}, params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('task.update', result);
      next(null, result);
    });
  },  
  destroy: function(id, next) {
    Task.destroy({id: id}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('task.destroy', result);
      next(null, result);
    });
  }
};