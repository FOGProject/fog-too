describe('AssociationService', function() {
    it ('should exist', function(done) {
        should.exist(AssociationService);
        done();
    });
    it ('should be able to assign in a "single" association', function(done) {
        Host.findOne({name: "ToImageAssociate"}).exec(function(err, host) {
            should.not.exist(err);
            should.exist(host);
            should.not.exist(host.image);
            Image.findOne({name: "ToHostAssociate"}).exec(function(err, image) {
                should.not.exist(err);
                should.exist(image);
                AssociationService.setSingle(Host, Image, "image", host.id, image.id, function(err) {
                    should.not.exist(err);
                    Host.findOne({name: "ToImageAssociate"}).exec(function(err, host) {
                        should.not.exist(err);
                        should.exist(host);
                        host.image.should.be.eq(image.id);
                        done();
                    });
                });
            });
        });
    });
    it ('should be able to unassign in a "single" association', function(done) {
        Host.findOne({name: "ToImageUnassociate"}).exec(function(err, host) {
            should.not.exist(err);
            should.exist(host);
            should.exist(host.image);
            AssociationService.setSingle(Host, Image, "image", host.id, null, function(err) {
                should.not.exist(err);
                Host.findOne({name: "ToImageUnassociate"}).exec(function(err, host) {
                    should.not.exist(err);
                    should.exist(host);
                    should.not.exist(host.image);
                    done();
                });
            });
        });
    });     
    it ('should reject an invalid parent when assigning in a "single" association', function(done) {
        Image.findOne({name: "ToHostAssociate"}).exec(function(err, image) {
            should.not.exist(err);
            should.exist(image);
            AssociationService.setSingle(Host, Image, "image", -1, image.id, function(err) {
                should.exist(err);
                err.should.be.eq('Invalid parent id');
                done();
            });
        });
    });
    it ('should reject an invalid child when assigning in a "single" association', function(done) {
        Host.findOne({name: "ToImageAssociateBadChild"}).exec(function(err, host) {
            should.not.exist(err);
            should.exist(host);
            AssociationService.setSingle(Host, Image, "image", host.id, -1, function(err) {
                should.exist(err);
                err.should.be.eq('Invalid child id');
                Host.findOne({name: "ToImageAssociateBadChild"}).exec(function(err, host) {
                    should.not.exist(err);
                    should.exist(host);  
                    should.not.exist(host.image);
                    done();           
                });
            });
        });
    });
    it ('should reject an invalid via attribute when assigning in a "single" association', function(done) {
        Host.findOne({name: "ToImageAssociate"}).exec(function(err, host) {
            should.not.exist(err);
            should.exist(host);
            Image.findOne({name: "ToHostAssociate"}).exec(function(err, image) {
                should.not.exist(err);
                should.exist(image);
                AssociationService.setSingle(Host, Image, "foobar", host.id, image.id, function(err) {
                    should.exist(err);
                    err.should.be.eq('Invalid via attribute');
                    done();
                });
            });
        });
    });    
    it ('should be able to assign in a "many" association', function(done) {
        Group.findOne({name: "ToHostAssociate"}).exec(function(err, group) {
            should.not.exist(err);
            should.exist(group);
            should.exist(group.hosts);
            group.hosts.length.should.be.eq(0);
            Host.find({name: { 'like': "ToGroupAssociate%"}}).exec(function(err, hosts) {
                should.not.exist(err);
                should.exist(hosts);
                hosts.length.should.not.be.eq(0);
                var ids = [];
                for(var i = 0; i < hosts.length; i++) {
                    ids.push(hosts[i].id);
                }
                AssociationService.assignMany(Group, Host, "hosts", group.id, ids, function(err) {
                    should.not.exist(err);
                    Group.findOne({name: "ToHostAssociate"}).populate('hosts').exec(function(err, group) {
                        should.not.exist(err);
                        should.exist(group);
                        should.exist(group.hosts);
                        group.hosts.length.should.be.eq(ids.length);
                        for(var i = 0; i < hosts.length; i++) {
                            group.hosts[i].id.should.be.eq(ids[i]);
                        }
                        done();
                    });
                });
            });
        });
    });
    it ('should be able to unassign in a "many" association', function(done) {
        Group.findOne({name: "ToHostUnassociate"}).populate('hosts').exec(function(err, group) {
            should.not.exist(err);
            should.exist(group);
            should.exist(group.hosts);
            group.hosts.length.should.not.be.eq(0);
            group.hosts.length.should.not.be.eq(1);
            var ids = [];
            for(var i = 0; i < group.hosts.length-1; i++) {
                ids.push(group.hosts[i].id);
            }
            var remainingId = group.hosts[group.hosts.length-1].id;
            AssociationService.unassignMany(Group, Host, "hosts", group.id, ids, function(err) {
                should.not.exist(err);
                Group.findOne({name: "ToHostUnassociate"}).populate('hosts').exec(function(err, group) {
                    should.not.exist(err);
                    should.exist(group);
                    should.exist(group.hosts);
                    group.hosts.length.should.be.eq(1);
                    group.hosts[0].id.should.be.eq(remainingId);
                    done();
                });
            });
        });
    });
    it ('should reject an invalid parent when assigning in a "many" association', function(done) {
        Host.findOne({name: "ToGroupAssociate1"}).exec(function(err, host) {
            should.not.exist(err);
            should.exist(host);
            AssociationService.assignMany(Group, Host, "hosts", -1, [host.id], function(err) {
                should.exist(err);
                err.should.be.eq('Invalid parent id');
                done();
            });
        });
    });
    it ('should reject an invalid child when assigning in a "many" association', function(done) {
        Group.findOne({name: "ToHostAssociateBadChild"}).exec(function(err, group) {
            should.not.exist(err);
            should.exist(group);
            AssociationService.assignMany(Group, Host, "hosts", group.id, [1,2,-1], function(err) {
                should.exist(err);
                err.should.be.eq('Invalid child with id -1');
                Group.findOne({name: "ToHostAssociateBadChild"}).populate('hosts').exec(function(err, group) {
                    should.not.exist(err);
                    should.exist(group);  
                    group.hosts.length.should.be.eq(0);
                    done();           
                });
            });
        });
    });
    it ('should reject an invalid parent when unassigning in a "many" association', function(done) {
        Host.findOne({name: "ToGroupAssociate1"}).exec(function(err, host) {
            should.not.exist(err);
            should.exist(host);
            AssociationService.unassignMany(Group, Host, "hosts", -1, [host.id], function(err) {
                should.exist(err);
                err.should.be.eq('Invalid parent id');
                done();
            });
        });
    });
    it ('should reject an invalid children when unassigning in a "many" association', function(done) {
        Group.findOne({name: "ToHostAssociateBadChild"}).exec(function(err, group) {
            should.not.exist(err);
            should.exist(group);
            AssociationService.unassignMany(Group, Host, "hosts", group.id, [1,2,-1], function(err) {
                should.exist(err);
                err.should.be.eq('Invalid child with id -1');
                Group.findOne({name: "ToHostAssociateBadChild"}).populate('hosts').exec(function(err, group) {
                    should.not.exist(err);
                    should.exist(group);  
                    group.hosts.length.should.be.eq(0);
                    done();           
                });
            });
        });
    });                       
});