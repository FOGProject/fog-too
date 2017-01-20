describe('Group', function() {
    it ('should not be empty', function(done) {
        Group.find().exec(function(err, groups) {
            should.not.exist(err);
            should.exist(groups);
            groups.length.should.not.be.eql(0);
            done();
        });
    });
    it ('should be able to find', function(done) {
        Group.find({name: "Example"}).exec(function(err, groups) {
            should.not.exist(err);
            should.exist(groups);
            groups.length.should.be.eql(1);
            groups[0].name.should.be.eql("Example");
            done();
        });
    });
    it ('should be able to create', function(done) {
        Group.create({name: "created"}).exec(function(err,  group) {
            should.not.exist(err);
            should.exist(group);
            group.name.should.be.eql("created");
            done();
        });
    });
    it ('should be able to update', function(done) {
        Group.update({name: "ToUpdate"}, {priority: 1}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            updated[0].name.should.be.eql("ToUpdate");
            updated[0].priority.should.be.eq(1);
            done();
        });
    });
    it ('should be able to destroy', function(done) {
        Group.destroy({name: "ToDestroy"}).exec(function(err) {
            should.not.exist(err);
            Group.find({name: "ToDestroy"}).exec(function(err, groups) {
                should.not.exist(err);
                groups.length.should.be.eql(0);
                done();
            });
        });
    });      
});