module.exports = {
  get: function(id, next) {  
    Role.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    Role.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    Role.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(params, next) {
    Role.create(params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('role.create', result);
      next(null, result);
    });
  },
  update: function(id, params, next) {
    Role.update({id: id}, params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('role.update', result);
      next(null, result);
    });
  },  
  destroy: function(id, next) {
    Role.destroy({id: id}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('role.destroy', result);
      next(null, result);
    });
  },
  assign: function(id, userIds, next) {
    RoleService.get(id, function(err, role) {
      if(err) return next(err);
      if(!role) return next('Could not find role');
      
      role.users.add(userIds);
      role.save(function(err) {
        if(err) return next(err);
        BusService.publish('role.update', role);
        RoleService.get(id, next);
      })
    });
  },
};