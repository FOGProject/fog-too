describe('Host', function() {
    it ('should not be empty', function(done) {
        Host.find().exec(function(err, hosts) {
            should.not.exist(err);
            should.exist(hosts);
            hosts.length.should.not.be.eql(0);
            done();
        });
    });
    it ('should be able to find', function(done) {
        Host.find({name: "Example"}).exec(function(err, hosts) {
            should.not.exist(err);
            should.exist(hosts);
            hosts.length.should.be.eql(1);
            hosts[0].name.should.be.eql("Example");
            done();
        });
    });
    it ('should be able to create', function(done) {
        Host.create({name: "created"}).exec(function(err,  host) {
            should.not.exist(err);
            should.exist(host);
            host.name.should.be.eql("created");
            done();
        });
    });
    it ('should be able to update', function(done) {
        Host.update({name: "ToUpdate"}, {guid: "d1efdfc9-9fbf-4cc2-bcaa-f3ee9340febf"}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            updated[0].name.should.be.eql("ToUpdate");
            updated[0].guid.should.be.eq("d1efdfc9-9fbf-4cc2-bcaa-f3ee9340febf");
            done();
        });
    });
    it ('should be able to destroy', function(done) {
        Host.destroy({name: "ToDestroy"}).exec(function(err) {
            should.not.exist(err);
            Host.find({name: "ToDestroy"}).exec(function(err, hosts) {
                should.not.exist(err);
                hosts.length.should.be.eql(0);
                done();
            });
        });
    });      
});