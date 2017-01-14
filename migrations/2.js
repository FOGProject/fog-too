'use strict;'

module.exports = {
    up: function(db, logger, next) {
        db.collection('role').update({}, {$set: {isNeat: true}}, next);
    },
    down: function(db, logger, next) {
        db.collection('role').update({}, {$unset: {isNeat: ""}}, next);
    },
    _meta: {
        schema: 2,
        description: "Add an isNeat flag to the Role model"
    }
};