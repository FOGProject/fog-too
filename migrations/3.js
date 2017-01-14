'use strict;'

module.exports = {
    up: function(db, logger, next) {
        db.collection('role').update({}, {$set: {isOld: true}}, next);
    },
    down: function(db, logger, next) {
        db.collection('role').update({}, {$unset: {isOld: ""}}, next);
    },
    _meta: {
        schema: 3,
        description: "Add an isOld flag to the Role model"
    }
};