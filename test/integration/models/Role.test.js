function ensureAllAreTrue(obj) {
  return !!Object.keys(obj).find(function(key) {
    if (typeof obj[key] === 'object') {
      return ensureAllAreTrue(obj[key])
    }
    return obj[key]
  });
}

describe('Role', function() {
    it ('should not be empty', function(done) {
        Role.find().exec(function(err, roles) {
            should.not.exist(err);
            should.exist(roles);
            roles.length.should.not.be.eql(0);
            done();
        });
    });
    it ('should be able to find', function(done) {
        Role.find({isAdmin: true}).exec(function(err, roles) {
            should.not.exist(err);
            should.exist(roles);
            roles.length.should.be.eql(1);
            roles[0].isAdmin.should.be.eq(true);
            done();
        });
    });
    it ('should be able to create', function(done) {
        Role.create({name: "Foobar", isAdmin: true, permissions: {}}).exec(function(err,  role) {
            should.not.exist(err);
            should.exist(role);
            role.isAdmin.should.be.eq(true);
            role.name.should.be.eql("Foobar");
            done();
        });
    });
    it ('should be able to update', function(done) {
        Role.update({name: "ToUpdate", isAdmin: false}, {isAdmin: true}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            updated[0].name.should.be.eql("ToUpdate");
            updated[0].isAdmin.should.be.eq(true);
            done();
        });
    });
    it ('should be able to destroy', function(done) {
        Role.destroy({name: "ToDestroy"}).exec(function(err) {
            should.not.exist(err);
            Role.find({name: "ToDestroy"}).exec(function(err, role) {
                should.not.exist(err);
                role.length.should.be.eql(0);
                done();
            });
        });
    });    
    it ('should auto fill missing permissions on create', function(done) {
        Role.create({name: "ToExpand", isAdmin: false, permissions: {}}).exec(function(err,  role) {
            should.not.exist(err);
            should.exist(role);
            role.permissions.should.not.eq({});
            done();
        });
    }); 
    it ('should mark all permissions as true if admin', function(done) {
        Role.findOne({isAdmin: true}).exec(function(err, role) {
            should.not.exist(err);
            should.exist(role);
            var result = ensureAllAreTrue(role.permissions);
            result.should.be.eq(true);
            done();
        });
    });             
});