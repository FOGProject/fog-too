var stripPassports = function(users) {
  var strippedUsers = _.map(users, function (row) {
    return _.omit(row, ['passports']);
  });
  return strippedUsers;
}

module.exports = {
  get: function(id, next) {  
    User.findOne({id: id}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, stripPassports(result));
    });
  },
  search: function(query, next) {  
    User.find(query).populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, stripPassports(result));
   });
  },  
  getAll: function(next) {
    User.find().populateAll().exec(function(err, result) {
      if(err) return next(err);
      next(null, stripPassports(result));
    });
  }
};