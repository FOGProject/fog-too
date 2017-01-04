module.exports = {
  get: function(id, next) {  
    Group.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  search: function(query, next) {  
    Group.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },  
  getAll: function(next) {
    Group.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, result);
    });
  },
  create: function(params, next) {
    Group.create(params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('group.create', result);
      next(null, result);
    });
  },
  update: function(id, params, next) {
    Group.update({id: id}, params).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('group.update', result);
      next(null, result);
    });
  },  
  destroy: function(id, next) {
    Group.destroy({id: id}).exec(function(err, result) {
      if(err) return next(err);
      BusService.publish('group.destroy', result);
      next(null, result);
    });
  },
  registerHost: function(id, hostIds, next) {
    GroupService.get(id, function(err, group) {
      if(err) return next(err);
      if(!group) return next('Could not find group');
      
      group.hosts.add(hostIds);
      group.save(function(err) {
        if(err) return next(err);
        BusService.publish('group.update', group);
        GroupService.get(id, next);
      })
    });
  },
  unregisterHost: function(id, hostIds, next) {
    GroupService.get(id, function(err, group) {
      if(err) return next(err);
      if(!group) return next('Could not find group');

      group.hosts.remove(hostIds);
      group.save(function(err) {
        if(err) return next(err);
        BusService.publish('group.update', group);
        GroupService.get(id, next);
      })
    });
  },  
};