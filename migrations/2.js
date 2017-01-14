'use strict;'

module.exports = {
    up: function(db, logger, next) {
        setTimeout(function () {
            db.collection('role').update({}, {$set: {isNeat: true}}, next);
        }, 5000)
    },
    down: function(db, logger, next) {
        setTimeout(function () {
            db.collection('role').update({}, {$unset: {isNeat: ""}}, next);
        }, 5000)
    },
    _meta: {
        schema: 2,
        description: "Add an isNeat flag to the Role model"
    }
};