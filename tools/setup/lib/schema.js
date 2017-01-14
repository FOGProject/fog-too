var sails = require('sails');
var config = require('../../lib/config');

var adminRole = {
    name: 'Administrator',
    isAdmin: true,
    permissions: {},
}

var adminUser = {
    username: 'Administrator',
}

module.exports = {
    generate: function(adminPassword, adminEmail, next) {
        var cfg = config.getMergedSettings();
        adminUser.email = adminEmail;
        adminUser.password = adminPassword;
        cfg.models = {};
        cfg.models.migrate = 'alter';
        sails.load(cfg, function(err, sails) {
            sails.services.settingservice.create("schema", {revision: cfg.schema}, function(err) {
                if (err) return next(err);
                sails.services.roleservice.create(adminRole, function(err, role) {
                    if (err) return next(err);
                    adminUser.role = role.id;
                    sails.services.userservice.create(adminUser, function(err, user) {
                        if (err) return next(err);
                        next();
                    });
                });
            })
        });           
    }
};