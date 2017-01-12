module.exports = { 
  get: function(id, next) {  
    User.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    User.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    User.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(params, next) {
    User.create(params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('user.create', result);
      next(null, result);
    });
  },
  update: function(id, params, next) {
    User.update({id: id}, params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('user.update', result);
      next(null, result);
    });
  },  
  destroy: function(id, next) {
    User.destroy({id: id}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('user.destroy', result);
      next(null, result);
    });
  },
  authenticate: function(username, password, next) {  
    User.findOne({username: username}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      if(!result) return('Could not find user');
      result.comparePassword(password, function(err, isMatch) {
        if(err) return next(err);
        if(!isMatch) return next();
        next(null, result);
      })
    });
  },  
};