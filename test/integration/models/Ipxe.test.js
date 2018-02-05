describe('Ipxe', function() {
    it ('should not be empty', function(done) {
        Ipxe.find().exec(function(err, ipxes) {
            should.not.exist(err);
            should.exist(ipxes);
            ipxes.length.should.not.be.eql(0);
            done();
        });
    });
    it ('should be able to find', function(done) {
        Ipxe.find({title: "Example"}).exec(function(err, ipxes) {
            should.not.exist(err);
            should.exist(ipxes);
            ipxes.length.should.be.eql(1);
            ipxes[0].title.should.be.eql("Example");
            done();
        });
    });
    it ('should be able to create', function(done) {
        Ipxe.create({title: "created"}).exec(function(err,  ipxe) {
            should.not.exist(err);
            should.exist(ipxe);
            ipxe.title.should.be.eql("created");
            done();
        });
    });
    it ('should be able to update', function(done) {
        Ipxe.update({title: "ToUpdate"}, {description: "Test"}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            updated[0].title.should.be.eql("ToUpdate");
            updated[0].description.should.be.eq("Test");
            done();
        });
    });
    it ('should be able to destroy', function(done) {
        Ipxe.destroy({title: "ToDestroy"}).exec(function(err) {
            should.not.exist(err);
            Ipxe.find({title: "ToDestroy"}).exec(function(err, ipxes) {
                should.not.exist(err);
                ipxes.length.should.be.eql(0);
                done();
            });
        });
    });
});
