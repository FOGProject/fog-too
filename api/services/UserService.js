'use strict;'

module.exports = { 
  authenticate: function(username, password, next) {  
    next = (typeof next !== 'function') ? function() {} : next;
    var errMsg = 'Invalid credentials';
    // Ensure the username is a string, contains characters, and is also alphanumeric
    if(typeof username !== 'string' || username.length === 0 || !username.match(/^[a-z0-9]+$/i))
      return next(errMsg);
    if(typeof password !== 'string' || password.length == 0)
      return next(errMsg);    
    User.findOne({username: username}).populateAll().exec(function(err, result) {
      if(err) return next(err);
      if(!result) return next(errMsg);
      result.comparePassword(password, function(err, isMatch) {
        if(err) return next(err);
        if(!isMatch) return next(errMsg);
        next(null, result);
      })
    });
  },  
};