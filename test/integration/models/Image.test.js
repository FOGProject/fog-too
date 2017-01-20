describe('Image', function() {
    it ('should not be empty', function(done) {
        Image.find().exec(function(err, images) {
            should.not.exist(err);
            should.exist(images);
            images.length.should.not.be.eql(0);
            done();
        });
    });
    it ('should be able to find', function(done) {
        Image.find({name: "Example"}).exec(function(err, images) {
            should.not.exist(err);
            should.exist(images);
            images.length.should.be.eql(1);
            images[0].name.should.be.eql("Example");
            done();
        });
    });
    it ('should be able to create', function(done) {
        Image.create({name: "created"}).exec(function(err,  image) {
            should.not.exist(err);
            should.exist(image);
            image.name.should.be.eql("created");
            done();
        });
    });
    it ('should be able to update', function(done) {
        Image.update({name: "ToUpdate"}, {writeLock: true}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            updated[0].name.should.be.eql("ToUpdate");
            updated[0].writeLock.should.be.eq(true);
            done();
        });
    });
    it ('should be able to destroy', function(done) {
        Image.destroy({name: "ToDestroy"}).exec(function(err) {
            should.not.exist(err);
            Image.find({name: "ToDestroy"}).exec(function(err, images) {
                should.not.exist(err);
                images.length.should.be.eql(0);
                done();
            });
        });
    });      
});