module.exports = {
  get: function(name, next) {  
    Setting.findOne({name: name}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    Setting.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    Setting.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(name, value, next) {
    var payload = {name: name, value: value};
    Setting.create(payload).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('setting.create', result);
      next(null, result);
    });
  },
  update: function(name, value, next) {
    Setting.update({name: name}, {value: value}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('setting.update', result);
      next(null, result);
    });
  },  
  destroy: function(name, next) {
    Setting.destroy({name: name}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('setting.destroy', result);
      next(null, result);
    });
  },  
};