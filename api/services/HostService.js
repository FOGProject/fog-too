module.exports = {
  get: function(id, next) {  
    Host.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    Host.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    Host.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(params, next) {
    Host.create(params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('host.create', result);
      next(null, result);
    });
  },
  update: function(id, params, next) {
    Host.update({id: id}, params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('host.update', result);
      next(null, result);
    });
  },  
  destroy: function(id, next) {
    Host.destroy({id: id}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('host.destroy', result);
      next(null, result);
    });
  }
};