var sails = require('sails');
var config = require('../../lib/config');

var adminRole = {
    name: 'Administrator',
    isAdmin: true,
    permissions: {},
};

var adminUser = {
    username: 'Administrator',
};

module.exports = {
    generate: function(adminPassword, adminEmail, next) {
        var cfg = config.getMergedSettings();
        adminUser.email = adminEmail;
        adminUser.password = adminPassword;
        cfg.models = {};
        cfg.models.migrate = 'alter';
        sails.load(cfg, function(err, sails) {
            sails.models.setting.create({name: "schema", value: {revision: cfg.schema}}).exec(function(err, setting) {
                if (err) return next(err);
                sails.models.role.create(adminRole).exec(function(err, role) {
                    if (err) return next(err);
                    sails.models.user.create(adminUser).exec(function(err, user) {
                        if (err) return next(err);
                        sails.services.associationservice.assignMany(sails.models.role, sails.models.user, "users", role.id, [user.id], function(err) {
                            if (err) return next(err);
                            next();
                        });
                    });
                });
            });
        });           
    }
};