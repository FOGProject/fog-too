var sails = require('sails');
var Barrels = require('barrels');
var chai = require('chai')
should = chai.should();

before(function(done) {
  this.timeout(10000);
  sails.lift({
      log: {
        level: 'error'
      },
      models: {
          connection: 'test',
          migrate: 'drop'
      },
      "hooks": {
        "views": false
    }
  }, function(err) {
    if (err) return done(err);
    
    // Load fixtures
    var barrels = new Barrels();
    
    // Populate the DB
    barrels.populate(function(err) {
        if (err) return done(err);
        done(null, sails);
    });
  });
});

after(function(done) {
  sails.lower(done);
});