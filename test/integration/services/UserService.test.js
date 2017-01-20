// Edge cases should be extensively tested for authentication
// as it is exposed via un-restricted routes

describe('UserService', function() {
    it ('should exist', function(done) {
        should.exist(UserService);
        done();
    });
    it ('should be able to authenticate a username and password and return the correct user', function(done) {
        UserService.authenticate("Administrator", "test123abc", function(err, user) {
            should.not.exist(err);
            should.exist(user);
            should.exist(user.username);
            user.username.should.be.eql("Administrator");
            done();
        });
    });
    it ('should reject authentication with a correct username but incorrect password', function(done) {
        UserService.authenticate("Administrator", "wrong", function(err, user) {
            should.exist(err);
            err.should.be.eql('Invalid credentials');
            should.not.exist(user);
            done();
        });
    });
    it ('should reject authentication with an incorrect username', function(done) {
        UserService.authenticate("InvalidUser", "password", function(err, user) {
            should.exist(err);
            err.should.be.eql('Invalid credentials');
            should.not.exist(user);
            done();
        });
    });
    it ('should reject authentication with a null username', function(done) {
        UserService.authenticate(null, "password", function(err, user) {
            should.exist(err);
            err.should.be.eql('Invalid credentials');
            should.not.exist(user);
            done();
        });
    });
    it ('should reject authentication with a null password', function(done) {
        UserService.authenticate("Administrator", null, function(err, user) {
            should.exist(err);
            err.should.be.eql('Invalid credentials');
            should.not.exist(user);
            done();
        });
    });    
    it ('should reject authentication with a non alphanumeric usernames', function(done) {
        UserService.authenticate("Admin%", "test123abc", function(err, user) {
            should.exist(err);
            err.should.be.eql('Invalid credentials');
            should.not.exist(user);
            done();
        });
    });
    it ('should reject authentication with a non string type username', function(done) {
        UserService.authenticate({user: "Administrator"}, "test123abc", function(err, user) {
            should.exist(err);
            err.should.be.eql('Invalid credentials');
            should.not.exist(user);
            done();
        });
    });  
    it ('should reject authentication with a non string type password', function(done) {
        UserService.authenticate("Administrator", {password: "test123abc"}, function(err, user) {
            should.exist(err);
            err.should.be.eql('Invalid credentials');
            should.not.exist(user);
            done();
        });
    });                    
});