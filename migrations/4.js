'use strict;'

module.exports = {
    up: function(db, logger, next) {
        db.collection('role').update({}, {$set: {isYoung: true}}, next);
    },
    down: function(db, logger, next) {
        db.collection('role').update({}, {$unset: {isYoung: ""}}, next);
    },
    _meta: {
        schema: 4,
        description: "Add an isYoung flag to the Role model"
    }
};