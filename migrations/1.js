'use strict;'

module.exports = {
    up: function(db, logger, next) {
        db.collection('role').update({}, {$set: {isCool: true}}, next);
    },
    down: function(db, logger, next) {
        db.collection('role').update({}, {$unset: {isCool: ""}}, next);
    },
    _meta: {
        description: "Add an isCool flag to the Role model"
    }
};