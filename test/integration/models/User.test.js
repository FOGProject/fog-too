function ensureAllAreTrue(obj) {
  return !!Object.keys(obj).find(function(key) {
    if (typeof obj[key] === 'object') {
      return ensureAllAreTrue(obj[key])
    }
    return obj[key]
  });
}

describe('User', function() {
    it ('should not be empty', function(done) {
        User.find().exec(function(err, users) {
            should.not.exist(err);
            should.exist(users);
            users.length.should.not.be.eql(0);
            done();
        });
    });
    it ('should be able to find', function(done) {
        User.find({username: "Administrator"}).exec(function(err, users) {
            should.not.exist(err);
            should.exist(users);
            users.length.should.be.eql(1);
            users[0].email.should.be.eq("admin@example.com");
            done();
        });
    });   
    it ('should be able to create', function(done) {
        User.create({username: "foobarCreate", email: "foobar-create@example.com", password: "appleseeds"}).exec(function(err,  user) {
            should.not.exist(err);
            should.exist(user);
            user.username.should.be.eq("foobarCreate");
            user.email.should.be.eq("foobar-create@example.com");
            done();
        });
    });
    it ('should be able to update', function(done) {
        User.update({username: "ToUpdate"}, {username: "ToUpdate2"}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            updated[0].username.should.be.eql("ToUpdate2");
            done();
        });
    });
    it ('should be able to destroy', function(done) {
        User.destroy({name: "ToDestroy"}).exec(function(err) {
            should.not.exist(err);
            User.find({name: "ToDestroy"}).exec(function(err, user) {
                should.not.exist(err);
                user.length.should.be.eql(0);
                done();
            });
        });
    });
    it ('should be able to find single role association', function(done) {
        User.findOne({username: "Administrator"}).populate('roles').exec(function(err, user) {
            should.not.exist(err);
            should.exist(user);
            should.exist(user.roles);
            user.roles.length.should.be.eql(1);
            user.roles[0].name.should.be.eq("Administrator");
            user.roles[0].isAdmin.should.be.eq(true);
            done();
        });
    });
    it ('should be able to find multiple role associations', function(done) {
        User.findOne({username: "RoleMerge"}).populate('roles').exec(function(err, user) {
            should.not.exist(err);
            should.exist(user);
            user.roles.length.should.be.eql(2);
            done();
        });
    });    
    it ('should generate blank permissions when there are no associated roles', function(done) {
        User.findOne({username: "NoRoles"}).exec(function(err, user) {
            should.not.exist(err);
            should.exist(user);
            var userJSON = user.toJSON();
            should.exist(userJSON);
            should.exist(userJSON.permissions);
            userJSON.permissions.should.be.eql({});
            done();
        });
    });
    it ('should generate an exact copy of permissions when there is one role associated', function(done) {
        User.findOne({username: "SingleRole"}).populate('roles').exec(function(err, user) {
            should.not.exist(err);
            should.exist(user);
            should.exist(user.roles);
            user.roles.length.should.be.eql(1);
            var userJSON = user.toJSON();
            var role = user.roles[0];
            should.exist(userJSON);
            should.exist(userJSON.permissions);
            userJSON.permissions.should.be.eql(role.permissions);
            done();
        });
    }); 
    it ('should merge multiple roles into one permissions object', function(done) {
        var idealPermissions = sails.config.permissions;
        idealPermissions.stock.host.create = true;
        idealPermissions.stock.group.create = true;
        User.findOne({username: "RoleMerge"}).populate('roles').exec(function(err, user) {
            should.not.exist(err);
            should.exist(user);
            should.exist(user.roles);
            user.roles.length.should.be.eql(2);
            var userJSON = user.toJSON();
            should.exist(userJSON);
            should.exist(userJSON.permissions);
            userJSON.permissions.should.be.eql(idealPermissions);
            done();
        });
    }); 
    it ('should reject non alphanumeric usernames', function(done) {
        User.create({username: "foobar-dash", email: "foobar-dash@example.com", password: "appleseeds"}).exec(function(err,  user) {
            should.exist(err);
            should.not.exist(user);
            done();
        });
    });                              
    it ('should validate correct password comparison', function(done) {
        User.findOne({username: "Administrator"}).exec(function(err,  user) {
            should.not.exist(err);
            should.exist(user);
            user.comparePassword("test123abc", function(err, match) {
                should.not.exist(err);
                should.exist(match);
                match.should.be.eql(true);
                done();
            });
        });
    }); 
    it ('should reject incorrect password comparison', function(done) {
        User.findOne({username: "Administrator"}).exec(function(err,  user) {
            should.not.exist(err);
            should.exist(user);
            user.comparePassword("wrongPassword", function(err, match) {
                should.not.exist(err);
                should.exist(match);
                match.should.be.eql(false);
                done();
            });
        });
    });         
    it ('should automatically hash passwords on create', function(done) {
        User.create({username: "foobarHash", email: "foobar-hash@example.com", password: "appleseeds"}).exec(function(err,  user) {
            should.not.exist(err);
            should.exist(user);
            user.password.should.not.be.eq("appleseeds");
            user.comparePassword("appleseeds", function(err, match) {
                should.not.exist(err);
                should.exist(match);
                match.should.be.eql(true);
                done();
            });            
        });
    });
    it ('should automatically hash passwords on update', function(done) {
        User.update({username: "ToUpdateHash"}, {password: "appleseeds"}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            var user = updated[0];
            user.password.should.not.be.eq("appleseeds");
            user.comparePassword("appleseeds", function(err, match) {
                should.not.exist(err);
                should.exist(match);
                match.should.be.eql(true);
                done();
            });            
        });
    });   

});