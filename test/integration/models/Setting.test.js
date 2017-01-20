describe('Setting', function() {
    it ('should not be empty', function(done) {
        Setting.find().exec(function(err, settings) {
            should.not.exist(err);
            should.exist(settings);
            settings.length.should.not.be.eql(0);
            done();
        });
    });
    it ('should be able to find', function(done) {
        Setting.find({name: "foo"}).exec(function(err, settings) {
            should.not.exist(err);
            should.exist(settings);
            settings.length.should.be.eql(1);
            should.exist(settings[0].value.bar);
            settings[0].value.bar.should.be.eql("foobar");
            done();
        });
    });
    it ('should be able to create', function(done) {
        Setting.create({name: "created", value:{test:5}}).exec(function(err,  setting) {
            should.not.exist(err);
            should.exist(setting);
            should.exist(setting.value);
            should.exist(setting.value.test);
            setting.value.test.should.be.eq(5);
            setting.name.should.be.eql("created");
            done();
        });
    });
    it ('should be able to update', function(done) {
        Setting.update({name: "ToUpdate"}, {value: {id: "worked"}}).exec(function(err,  updated) {
            should.not.exist(err);
            should.exist(updated);
            updated.length.should.be.eql(1);
            updated[0].name.should.be.eql("ToUpdate");
            should.exist(updated[0].value);
            should.exist(updated[0].value.id);
            updated[0].value.id.should.be.eq("worked");
            done();
        });
    });
    it ('should be able to destroy', function(done) {
        Setting.destroy({name: "ToDestroy"}).exec(function(err) {
            should.not.exist(err);
            Setting.find({name: "ToDestroy"}).exec(function(err, setting) {
                should.not.exist(err);
                setting.length.should.be.eql(0);
                done();
            });
        });
    });      
});